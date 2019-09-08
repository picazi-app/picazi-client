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
}

class Photo extends React.Component<PhotoProps> {

	render(){
    const { post } = this.props;

		return(
			<figure className="grid-figure">
				<div className="grid-photo-wrap">
					<Link to={`/view/${post._id}`}>
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
						<Link className="button" to={`/view/${post._id}`}>
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

export default Photo;