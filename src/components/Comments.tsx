import React from 'react';
import { Comment, UserComments } from '../store/types/comments';
import { AddCommentAction, RemoveCommentAction } from '../actions/actionCreators';
import {  RouteComponentProps } from 'react-router-dom';



interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>;
interface CommentsProps{
  postComments: Comment[];
  // params: ParamProps;
  addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  removeComment: (postId: string, i: number) => RemoveCommentAction

}
type Props = OwnProps & CommentsProps


class Comments extends React.Component<Props> {
  commentForm = React.createRef<HTMLFormElement>();
  author = React.createRef<HTMLInputElement>();
  comment = React.createRef<HTMLInputElement>();

	constructor(props:any){
		super(props)
    this.renderComment=this.renderComment.bind(this)
  }
  
	renderComment(comment: Comment, index: number) {
		return (
			<div className="comment" key={index}>
				<p>
					<strong>{comment.user}</strong>
					{comment.text}
					<button className="remove-comment" 
					onClick={this.props.removeComment.bind(null, this.props.match.params.postId, index)}>&times;</button>
				</p>
			</div>
		)
  }
	handleSubmit = (e: any) => {
    e.preventDefault();
    const postId  = this.props.match.params.postId;
    console.log("postId", postId)
    const author = (this.refs.author as HTMLInputElement).value
		const comment = (this.refs.comment as HTMLInputElement).value;
		this.props.addComment(postId, author, comment);
		(this.refs.commentForm as HTMLFormElement).reset();
	}
	render() {
    console.log("this.props inside comments ", this.props)
    const { params } = this.props.match;
		return(
			<div className="comments">
				{ this.props.postComments.map(this.renderComment)}
				<form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
					<input type="text" ref="author" placeholder="author"/>
					<input type="text" ref="comment" placeholder="comment"/>
					<input type="submit"/>
				</form>
			</div>
		)
	}
}

export default Comments;