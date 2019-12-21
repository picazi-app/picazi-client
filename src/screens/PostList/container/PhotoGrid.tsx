import React from 'react';
import Photo from '../../../components/Photo';
import { PostList } from "../store/types";
import { getPostListStateProps } from "../store/selectors";
import { StateProps } from '../../../store/types';
import { withRouter, RouteComponentProps, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostListData, incrementLikes } from '../store/action'
import { getSessionStateProps } from '../../../store/selector'
import PhotoUpload from '../components/PhotoUpload'
import { removeSinglePost } from '../store/action'
import queryString from 'querystring';

interface PhotoGridStateProps{
  posts: PostList;
  isLoggedIn: boolean;
  totalPages: number;
}

// interface StateProps {
//   currentPage: number;
//   totalPages: number;
// }
interface PostGridActionProps {
  getPostListData: (page: number) => Promise<any>;
  removeSinglePost: (postId: string) => void;
  incrementLikes: (postId: string, likes: number) => void;
}

type Props = PhotoGridStateProps & PostGridActionProps & RouteComponentProps;

function getPage (locationString: string): number {
  const queryParams = new URLSearchParams(locationString);
  const page = queryParams && parseInt(queryParams.get('page')) || 1;
  return page;
}

class PhotoGridContainer extends React.Component<Props> {
 
  componentDidMount() {
    const { isLoggedIn, getPostListData, location } = this.props;

    if(isLoggedIn){
      getPostListData(getPage(location.search))
    }
  }
  handleIncrementLikes(postId: string, likes: number) {
    this.props.incrementLikes(postId, likes);
  }
  handleClickRemovePost(postId: string) {
    this.props.removeSinglePost(postId);
  }
  pageHandler = (pageNumber: number) => () => {
    const { location, getPostListData } = this.props;
    getPostListData(getPage(location.search) + pageNumber);
  }
	render(){
    const { posts, isLoggedIn, getPostListData, history, totalPages  } = this.props;
    const page = getPage(history.location.search);

    const postData = posts ? posts.map((post, i)=> 
      {
        return <Photo {...this.props} key={i} post={post} 
                  incrementLikes={() => this.handleIncrementLikes(post._id, post.likes)} 
                  removeSinglePost={() => this.handleClickRemovePost(post._id)} />
      }) : null

		return(
      <div>
        { isLoggedIn && 
          <>
            <PhotoUpload getPostListData={getPostListData}/>
            <div className="photo-grid">
              { postData }
            </div>
            <div style={{textAlign: "center"}}>
              { (page > 1) &&
                <Link to={`/posts?page=${page-1}`}>
                  <button onClick={this.pageHandler(-1)}>Prev </button>
                </Link>
              }
             { 
               (page< totalPages) && <Link to={`/posts?page=${page+1}`}>
                <button onClick={this.pageHandler(1)}>Next</button>
              </Link>}
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
    isLoggedIn: getSessionStateProps(state).isLoggedIn,
  }
}

const PhotoGrid = (connect(mapStateToProps, {
  getPostListData: getPostListData,
  removeSinglePost: removeSinglePost,
  incrementLikes: incrementLikes
})(PhotoGridContainer));

export default PhotoGrid;
