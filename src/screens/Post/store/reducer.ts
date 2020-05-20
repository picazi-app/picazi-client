import { PostInfoScreenProps} from './types';
import { ActionTypes } from './actions';

export const defaultPostInfoScreenProps: PostInfoScreenProps = {
  postInfo: {
    post: {
      _id: "",
      caption: "",
      likes: 0,
      display_src: "",
      totalComments: 0,
    },
    comments: []
  }
};

export function postComments(state: PostInfoScreenProps = defaultPostInfoScreenProps, action: any) : PostInfoScreenProps {
	switch(action.type) {
    case ActionTypes.POSTINFO_TOGGLE_LIKE:
      let likes = state.postInfo.post.likes;

      return {
        ...state,
        postInfo: {
          post: {
            ...state.postInfo.post,          
            likes: action.data.isLiked ? likes += 1 : likes -= 1,
          },
          comments: state.postInfo.comments
        }  
      }
    case 'FETCH_COMMENTS': 
      return {
        ...state,
        postInfo: {
          post: state.postInfo.post,
          comments: action.data
        }  
      }
    case 'SAVE_COMMENTS':
      //return the new state with new comment
      const comments = action.data;
     
      return {
        ...state,
        postInfo: {
          post: state.postInfo.post,
          comments:comments
        } 
      };

    case 'REMOVE_COMMENT':
      return {
        ...state,
        postInfo: {
          post: state.postInfo.post,
          comments: action.data.comments
        } 
      };
    case 'GET_PHOTO':
      return {
        ...state,
        postInfo: {
          post: {
            _id: action.data._id,
            caption: action.data.caption,
            likes: action.data.likes,
            display_src: action.data.display_src,
            totalComments: action.data.totalComments
          },
        comments: state.postInfo.comments
        }
    }
    default:
    return state;
  }
}