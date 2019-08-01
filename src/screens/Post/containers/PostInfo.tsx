import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Photo from '../../../components/Photo';
import Comments from '../components/Comments';
import { Post } from '../../Post/store/types';
import { Comment } from '../store/types'
import { AddCommentAction, RemoveCommentAction } from '../store/actions';
import { connect  }from 'react-redux';
import { actionCreators } from '../store/actions'
import { bindActionCreators, Dispatch} from 'redux';

interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>;
interface PostInfoProps {
  post: Post;
  comments: Comment[];
  addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  removeComment: (postId: string, i: number) => RemoveCommentAction;
}
type Props = OwnProps & PostInfoProps

class PostInfo extends React.Component<Props>{
	render(){
    const { post } = this.props;
		//get us the post
		const postComments = this.props.comments || [];
    
		return(
			<div className="single-photo">
				<Photo post={post}/>
				<Comments postComments={postComments} {...this.props}/>
			</div>
		)
	}
}

function mapStateToProps(state: any) {
  return {
    postInfo_screen: state.postInfo_screen
  }
}
 
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostInfo));