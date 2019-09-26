import React from 'react';
import { Comment } from '../store/types';
import { RemoveCommentAction } from '../store/actions';
import { RouteComponentProps } from 'react-router-dom';
// import { fetchComments } from '../store/actions';
import { connect  } from 'react-redux';


interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>;
interface CommentsProps{
  saveComment: (postId: string, comment: string) => void;
  postComments: Comment[];
  // addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  removeComment: (postId: string, commentId: string) => void;
}
type Props = OwnProps & CommentsProps


class Comments extends React.Component<Props> {

	constructor(props:any){
		super(props)
    this.renderComment=this.renderComment.bind(this)
  }
	renderComment(comment: Comment, index: number) {
		return (
			<div className="comment" key={index}>
				<p>
					<strong>{comment.username}</strong>
          {comment.text}
          <button className="remove-comment" 
					onClick={() => this.props.removeComment(this.props.match.params.postId, comment._id)}>&times;</button>
					{/* <button className="remove-comment" 
					onClick={this.props.removeComment.bind(null, this.props.match.params.postId, index)}>&times;</button> */}
				</p>
			</div>
		)
  }
	handleSubmit = (e: any) => {
    e.preventDefault();
    const postId  = this.props.match.params.postId;
    console.log("postId", postId)
    // const author = (this.refs.author as HTMLInputElement).value
    const comment = (this.refs.comment as HTMLInputElement).value;
    if(comment !== null) {
      this.props.saveComment(postId, comment);
    }
		(this.refs.commentForm as HTMLFormElement).reset();
	}
	render() {
		return(
			<div className="comments">
				{ this.props.postComments.map(this.renderComment)}
				<form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
					<input type="text" ref="comment" placeholder="comment"/>
					<input type="submit"/>
				</form>
			</div>
		)
	}
}

export default Comments;