import React from 'react';
import Photo from '../../../components/Photo';
import { PostList } from "../store/types";
import { getPostListStateProps } from "../store/selectors";
import { StateProps } from '../../../store/types';
import { PostListScreenProps } from '../store/types'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

interface PhotoGridProps {
  posts: PostList;
}

class PhotoGridContainer extends React.Component<PhotoGridProps> {
  
	render(){
    console.log(this.props.posts);
		return(
			<div className="photo-grid">
				{this.props.posts.map((post, i)=> 
					<Photo {...this.props} key={i} post={post} />)}
			</div>
		)
	}
}

function mapStateToProps(state: StateProps, { location}: RouteComponentProps ) : PostListScreenProps{
  return {
    posts: getPostListStateProps(state).posts
  }
}

const PhotoGrid = withRouter(connect(mapStateToProps, null)(PhotoGridContainer))
export default PhotoGrid;
