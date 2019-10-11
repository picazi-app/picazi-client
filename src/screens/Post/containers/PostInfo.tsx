import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Photo from '../../../components/Photo';
import Comments from '../components/Comments';
import { connect  } from 'react-redux';
import { StateProps } from '../../../store/types';
import { PostInfoScreenProps } from "../store/types";
import { getPostInfoStateProps } from "../store/selectors";
import { getPhoto } from '../store/actions'
import { fetchComments } from '../store/actions';
import {getAppErrorsStateProps} from '../../../store/selector'
import { incrementLikes, saveComment, removeComment, removeSinglePost } from '../store/actions';
import { Link } from 'react-router-dom';
interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>;

type PostInfoProps = PostInfoScreenProps;

interface PostInfoActionProps {
  // addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  saveComment: (postId: string, comment: string) => void;
  removeComment: (postId: string, commentId: string) => void;
  removeSinglePost: (postId: string) => void;
  getPhoto: (postId: any) => Promise<any>;
  fetchComments: (postId: string) => void;
  incrementLikes: (postId: string, likes: number) => void;
  status: number|null;
}
type Props = OwnProps & PostInfoProps & PostInfoActionProps;

class PostInfoContainer extends React.Component<Props>{
  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.getPhoto(postId);
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
        <div className="single-photo">
          <Photo post={postInfo.post} 
            incrementLikes={() => this.props.incrementLikes(postInfo.post._id, postInfo.post.likes)} 
            {...this.props} 
            removeSinglePost={() => this.props.removeSinglePost(postInfo.post._id)}
            />
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
    status: getAppErrorsStateProps(state).status
  }
}

const PostInfo = withRouter(connect(mapStateToProps, {
  saveComment: saveComment,
  removeComment: removeComment,
  getPhoto: getPhoto,
  fetchComments: fetchComments,
  incrementLikes: incrementLikes,
  removeSinglePost: removeSinglePost
})(PostInfoContainer));

export default PostInfo;