import {  ActionPayloads } from './actions';
import { PostInfoScreenProps} from './types';

export const defaultPostInfoScreenProps: PostInfoScreenProps = {
  postInfo: {
    post: {
      code: "",
      caption: "",
      likes: 0,
      id: "",
      display_src: "",
      totalComments: 0,
    },
    comments: []
  }
};

export function postComments(state: PostInfoScreenProps = defaultPostInfoScreenProps, action: ActionPayloads | any) : PostInfoScreenProps {
	switch(action.type) {
    case 'FETCH_COMMENTS': 
      console.log("inside FETCH_COMMENTS", state);
      break;
    case 'ADD_COMMENT':
      //return the new state with new comment
      const commentsToAddTo = state.postInfo.comments;

      return {
        ...state,
        postInfo: {
          post: state.postInfo.post,
          comments: commentsToAddTo.concat({
            user: action.author,
            text: action.comment
          })
        } 
      };

    case 'REMOVE_COMMENT':
      const commentsToRemoveFrom = state.postInfo.comments;
      return {
        ...state,
        postInfo: {
          post: state.postInfo.post,
          comments: [
            ...commentsToRemoveFrom.slice(0, action.index),
            ...commentsToRemoveFrom.slice(action.index + 1)
          ]
        } 
      };
      
    default:
      return state;
	}
	return state;
}
