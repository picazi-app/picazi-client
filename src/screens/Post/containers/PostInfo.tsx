import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Photo from '../../../components/Photo';
import Comments from '../components/Comments';
import { Post } from '../../Post/store/types';
import { Comment } from '../store/types'
import { actionCreators } from '../store/actions';
import { AddCommentAction, RemoveCommentAction } from '../store/actions';
import { connect  } from 'react-redux';
import { StateProps } from '../../../store/types';
import { PostInfoScreenProps } from "../store/types";
import { getPostInfoStateProps } from "../store/selectors";
import { getPhoto } from '../store/actions'
import { fetchComments } from '../store/actions';

interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>;

type PostInfoProps = PostInfoScreenProps;

interface PostInfoActionProps {
  addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  removeComment: (postId: string, i: number) => RemoveCommentAction;
  getPhoto: (postId: any) => void;
  fetchComments: (postId: string) => void;
}
type Props = OwnProps & PostInfoProps & PostInfoActionProps;

class PostInfoContainer extends React.Component<Props>{
  componentDidMount() {
    const { postId } = this.props.match.params
    //call action to get photo info
    this.props.getPhoto(postId);
    // call action to fetch comments
    this.props.fetchComments(postId);
  }
	render(){
    const { postInfo } = this.props;
		//get us the post
		const postComments = postInfo.comments || [];
    
		return(
			<div className="single-photo">
				<Photo post={postInfo.post}/>
				<Comments postComments={postComments} {...this.props}/>
			</div>
		)
	}
}

function mapStateToProps(state: StateProps, { location }: RouteComponentProps ) : PostInfoScreenProps{
  return {
    ...getPostInfoStateProps(state)
  }
}

const PostInfo = withRouter(connect(mapStateToProps, {
  addComment: actionCreators.addComment,
  removeComment: actionCreators.removeComment,
  getPhoto: getPhoto,
  fetchComments: fetchComments

})(PostInfoContainer));

export default PostInfo;