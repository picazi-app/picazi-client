import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Photo from './Photo';
import Comments from './Comments';
import { Post } from "../store/types/posts";
import { Comment, UserComments } from "../store/types/comments";
import { AddCommentAction, RemoveCommentAction } from '../actions/actionCreators';
import { type } from 'os';

interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>;
interface SingleProps {
  posts: Post[];
  comments: UserComments;
  addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  removeComment: (postId: string, i: number) => RemoveCommentAction;
  index: number;
  increment: (index:number) => void;
}
type Props = OwnProps & SingleProps
// interface ParamsProps {
//   postId: string;
// }

class Single extends React.Component<Props>{
	render(){
    const { match } = this.props;
    console.log("match", match)
		//index of the post
		const i = this.props.posts.findIndex((post) => 
      post.code === match.params.postId)
    console.log("this.props.match", this.props.match)
    console.log("i", i)
		//get us the post
		const post = this.props.posts[i];
		const postComments = this.props.comments[match.params.postId] || [];
		console.log("post is", post)
		return(
			<div className="single-photo">
				<Photo index={i} post={post} {...this.props}/>
				<Comments postComments={postComments} {...this.props}/>
			</div>
		)
	}
}

export default withRouter(Single);