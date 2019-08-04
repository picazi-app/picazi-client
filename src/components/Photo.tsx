import React from 'react';
import { Link } from 'react-router-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Post } from '../screens/Post/store/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateProps } from '../store/types';
import { getPostListStateProps } from "../screens/PostList/store/selectors";

interface PhotoProps {
  post: Post;
  onPhotoClick?: (post: Post) => void;
}

class Photo extends React.Component<PhotoProps> {
  handleClick = () => {
    const { post, onPhotoClick } = this.props;
    if (onPhotoClick) {
      onPhotoClick(post)
    }
  }

	render(){
    const { post } = this.props;

		return(
			<figure className="grid-figure">
				<div className="grid-photo-wrap">
					<Link to={`/view/${post.code}`} onClick={this.handleClick}>
						<img src={post.display_src} alt={post.caption} className="grid-photo"/>
					</Link>
					<CSSTransitionGroup transitionName="like"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={500}>
						<span key={post.likes} className="likes-heart">
							{post.likes}
						</span>
					</CSSTransitionGroup>
				</div>
				<figcaption>
					<p>{post.caption}</p>
					<div className="control-buttons">
						<button className="likes">&hearts; {post.likes}</button>
						<Link className="button" to={`/view/${post.code}`}>
							<span className="comment-count">
								<span className="speech-bubble"></span>
								{post.totalComments}
							</span>
						</Link>
					</div>
				</figcaption>
			</figure>
		)
	}
}

// function mapStateToProps(state: StateProps, { location}: RouteComponentProps ){
//   console.log(getPostListStateProps(state))
//   return {
//     posts: getPostListStateProps(state).posts
//   }
// }
// const Photo = (connect(mapStateToProps, null)(ViewPhoto))
export default Photo;