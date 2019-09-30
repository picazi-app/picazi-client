import React from 'react';
import Photo from '../../../components/Photo';
import { PostList } from "../store/types";
import { Post } from '../../Post/store/types';
import { getPostListStateProps } from "../store/selectors";
import { StateProps } from '../../../store/types';
import { PostListScreenProps } from '../store/types'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostListData, incrementLikes } from '../store/action'
// import { viewPhoto } from '../../Post/store/actions';
// import { logout } from '../../../store/action'
import { getSessionStateProps, getAppErrorsStateProps } from '../../../store/selector'
import PhotoUpload from '../components/PhotoUpload'

interface PhotoGridStateProps{
  posts: PostList;
  isLoggedIn: boolean;
  // status: number | null;
}

interface PostGridActionProps {
  getPostListData: () => Promise<any>;
  // viewPhoto: (post: Post) => void;
  incrementLikes: (postId: string, likes: number) => void;
  // logout: () => void,
}

type Props = PhotoGridStateProps & PostGridActionProps;


class PhotoGridContainer extends React.Component<Props> {
  componentDidMount() {
    if(this.props.isLoggedIn){
      this.props.getPostListData()
    }
  }
  handleClick(postId: string, likes: number) {
    this.props.incrementLikes(postId, likes);
  }
	render(){
    const { posts, isLoggedIn, getPostListData } = this.props;
    // console.log("POSTgrid");
    // console.log(isLoggedIn);
    const postData = posts ? posts.map((post, i)=> 
      {
        return <Photo {...this.props} key={i} post={post} incrementLikes={() => this.handleClick(post._id, post.likes)} />
      }) : null

		return(
      <div>
        { isLoggedIn && 
          <>
            <PhotoUpload getPostListData={getPostListData}/>
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
    isLoggedIn: getSessionStateProps(state).isLoggedIn,
    // status: getAppErrorsStateProps(state).status
 
  }
}

const PhotoGrid = withRouter(connect(mapStateToProps, {
  getPostListData: getPostListData,
  // viewPhoto: viewPhoto,
  incrementLikes: incrementLikes
  // logout: logout
})(PhotoGridContainer));

export default PhotoGrid;
