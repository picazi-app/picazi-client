import React from 'react';
import Photo from '../../../components/Photo';
import { PostList } from "../store/types";
import { Post } from '../../Post/store/types';
import { getPostListStateProps } from "../store/selectors";
import { StateProps } from '../../../store/types';
import { PostListScreenProps } from '../store/types'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostListData } from '../store/action'
import { viewPhoto } from '../../Post/store/actions';
// import { logout } from '../../../store/action'
import { getSessionStateProps } from '../../../store/selector'

interface PhotoGridStateProps{
  posts: PostList;
  isLoggedIn: boolean
}

interface PostGridActionProps {
  getPostListData: () => Promise<any>;
  viewPhoto: (post: Post) => void;
  // logout: () => void,
}

type Props = PhotoGridStateProps & PostGridActionProps;


class PhotoGridContainer extends React.Component<Props> {

  componentDidMount() {
    if(this.props.isLoggedIn){
      this.props.getPostListData()
    }
  }

  handleClick = (post: Post) => {
    //call action and send post to reducer and set it.
    this.props.viewPhoto(post)
  }
  
  // logout = () => {
  //   // const user = getUserSession()
  //   // deleteSession()
  //   this.props.logout()
  // }

	render(){
    const { posts, isLoggedIn } = this.props;
    console.log("POSTgrid");
    console.log(isLoggedIn);
    const postData = posts ? posts.map((post, i)=> 
      {
        return <Photo {...this.props} key={i} post={post} onPhotoClick={this.handleClick}/>
      }) : null

		return(
      <div>
        { isLoggedIn && 
          <>
            <input type="text" />
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
    isLoggedIn: getSessionStateProps(state).isLoggedIn
 
  }
}

const PhotoGrid = withRouter(connect(mapStateToProps, {
  getPostListData: getPostListData,
  viewPhoto: viewPhoto,
  // logout: logout
})(PhotoGridContainer));

export default PhotoGrid;
