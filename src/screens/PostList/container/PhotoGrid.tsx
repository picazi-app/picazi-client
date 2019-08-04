import React from 'react';
import Photo from '../../../components/Photo';
import { PostList } from "../store/types";
import { Post } from '../../Post/store/types';
import { getPostListStateProps } from "../store/selectors";
import { StateProps } from '../../../store/types';
import { PostListScreenProps } from '../store/types'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostListData } from '../store/action'
import { viewPhoto } from '../../Post/store/actions';

interface PhotoGridProps {
  posts: PostList;
  getPostListData: () => Promise<any>;
  viewPhoto: (post: Post) => void;
}

class PhotoGridContainer extends React.Component<PhotoGridProps> {

  componentDidMount() {
    this.props.getPostListData(); 
  }

  handleClick = (post: Post) => {
    //call action and send post to reducer and set it.
    this.props.viewPhoto(post)
  }
  
	render(){
    const { posts } = this.props;
    const postData = posts ? posts.map((post, i)=> 
      {
        return <Photo {...this.props} key={i} post={post} onPhotoClick={this.handleClick}/>
      }) : null

		return(
			<div className="photo-grid">
        { postData }
			</div>
		)
	}
}

function mapStateToProps(state: StateProps, { location}: RouteComponentProps ) : PostListScreenProps{
  return {
    posts: getPostListStateProps(state).posts
  }
}

const PhotoGrid = withRouter(connect(mapStateToProps, {
  getPostListData: getPostListData,
  viewPhoto: viewPhoto
})(PhotoGridContainer));

export default PhotoGrid;
