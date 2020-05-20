import React from 'react';
import { Link } from 'react-router-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Post } from '../screens/Post/store/types';


interface PhotoProps {
  post: Post;
  toggleLike: (postId: string, likes: number) => void;
  removeSinglePost: (postId: string) => void;
}

class Photo extends React.Component<PhotoProps> {
  
  handleClick = ( postId: string, likes: number) => (e: any) => {
    this.props.toggleLike(postId, likes);
  }

	render(){
    const { post } = this.props;
		return(
			<figure className="grid-figure">
				<div className="grid-photo-wrap">
          <button className="remove-post" onClick={() => this.props.removeSinglePost(post._id)}>&times;</button>
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
          {/* <button onClick={this.props.increment.bind(null, i)} className="likes">&hearts; {post.likes}</button> */}
						<button onClick={this.handleClick(post._id, post.likes)} className="likes">&hearts; {post.likes}</button>
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