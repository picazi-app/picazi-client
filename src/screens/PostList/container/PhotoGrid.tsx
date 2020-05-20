import React from 'react';
import Photo from '../../../components/Photo';
import { PostList } from "../store/types";
import { getPostListStateProps } from "../store/selectors";
import { StateProps } from '../../../store/types';
import { withRouter, RouteComponentProps, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLatestPosts, fetchPosts, toggleLike } from '../store/action'
import { getSessionStateProps } from '../../../store/selector'
import PhotoUpload from '../components/PhotoUpload'
import { removeSinglePost } from '../store/action'

interface PhotoGridStateProps{
  posts: PostList;
  isLoggedIn: boolean;
  totalPages: number;
  loading: boolean;
  // page: number;
}

interface InternalStateProps {
  page: number;

}
interface PostGridActionProps {
  fetchLatestPosts: () => Promise<any>;
  fetchPosts: (page: number) => Promise<any>;
  removeSinglePost: (postId: string) => void;
  toggleLike: (postId: string, likes: number) => void;
}

type Props = PhotoGridStateProps & PostGridActionProps & RouteComponentProps;

class PhotoGridContainer extends React.Component<Props, InternalStateProps> {
  constructor(props: Props) {
    super(props)
    this.state = {
      page: 1,
    }
  }
  componentDidMount() {
    const { isLoggedIn, fetchLatestPosts } = this.props;

    if(isLoggedIn){
      fetchLatestPosts();
    }

    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  loadMore = () => {
    const { fetchPosts } = this.props;

    this.setState( prevState => {
      return {
        page: prevState.page + 1
      };
    }, () => fetchPosts(this.state.page))
    
  }

  handleScroll = (e:any) => {
    const { totalPages } = this.props;
    const { page } = this.state;
    
    if(totalPages <= page) return;

    const figure = document.getElementsByTagName('figure');

    const lastFigure = figure[figure.length - 1];
    if(lastFigure) {
      const lastFigOffset = lastFigure.offsetTop + lastFigure.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
  
      var bottomOffset = 20;
  
      if(pageOffset > lastFigOffset - bottomOffset) {
        this.loadMore();
      }

    }

  }
  handleIncrementLikes(postId: string, likes: number) {
    this.props.toggleLike(postId, likes);
  }
  handleClickRemovePost(postId: string) {
    this.props.removeSinglePost(postId);
  }
	render(){
    const { posts, isLoggedIn, fetchLatestPosts } = this.props;
    const postData = posts ? posts.map((post, i)=> 
      {
        return <Photo {...this.props} key={i} post={post} 
                  toggleLike={() => this.handleIncrementLikes(post._id, post.likes)} 
                  removeSinglePost={() => this.handleClickRemovePost(post._id)} />
      }) : null

		return(
      <div>
        { isLoggedIn && 
          <>
            <PhotoUpload fetchLatestPosts={fetchLatestPosts}/>
            <div className="photo-grid">
              { postData }
            </div>
          </>
        }
        {!isLoggedIn && 
          <Redirect to='/login' />
          
        }
      </div>
		)
	}
}

function mapStateToProps(state: StateProps, { location}: RouteComponentProps ) : PhotoGridStateProps {
  return {
    posts: getPostListStateProps(state).posts,
    totalPages: getPostListStateProps(state).totalPages,
    loading: getPostListStateProps(state).loading,
    isLoggedIn: getSessionStateProps(state).isLoggedIn,
  }
}

const PhotoGrid = (connect(mapStateToProps, {
  fetchLatestPosts: fetchLatestPosts,
  fetchPosts: fetchPosts,
  removeSinglePost: removeSinglePost,
  toggleLike: toggleLike
})(PhotoGridContainer));

export default PhotoGrid;
