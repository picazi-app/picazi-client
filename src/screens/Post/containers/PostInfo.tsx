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
import { getSessionStateProps } from '../../../store/selector';
import {getAppErrorsStateProps} from '../../../store/selector'
import GenericNotFound from '../../../components/GenericNotFound';
import { incrementLikes } from '../store/actions';
interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>;

type PostInfoProps = PostInfoScreenProps;

interface PostInfoActionProps {
  addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  removeComment: (postId: string, i: number) => RemoveCommentAction;
  getPhoto: (postId: any) => Promise<any>;
  fetchComments: (postId: string) => void;
  incrementLikes: (postId: string, likes: number) => void;
  status: number|null;
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
    //we're getting the value from the reducer's state which is getPostInfoStateProps()
    const { postInfo } = this.props;
    console.log(this.props);
		//get us the post
		const postComments = postInfo.comments || [];
    
		return(
      <>
      { 
        // (this.props.status) === 404 
        //   ? 
          // <GenericNotFound/> : 
          <div className="single-photo">
            <Photo post={postInfo.post} incrementLikes={() => this.props.incrementLikes(postInfo.post._id, postInfo.post.likes)}/>
            <Comments postComments={postComments} {...this.props}/>
          </div>
      }
			</>
		)
	}
}
// PostInfoScreenProps
function mapStateToProps(state: StateProps, { location }: RouteComponentProps ){
  return {
    ...getPostInfoStateProps(state),
    // ...getAppErrorsStateProps(state)
    status: getAppErrorsStateProps(state).status
  }
}

const PostInfo = withRouter(connect(mapStateToProps, {
  addComment: actionCreators.addComment,
  removeComment: actionCreators.removeComment,
  getPhoto: getPhoto,
  fetchComments: fetchComments,
  incrementLikes: incrementLikes
})(PostInfoContainer));

export default PostInfo;