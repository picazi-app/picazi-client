import {  ActionPayloads } from './actions';
import { PostInfoScreenProps} from './types';
import { stat } from 'fs';

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

export function postComments(state: PostInfoScreenProps = defaultPostInfoScreenProps, action: ActionPayloads | any) : PostInfoScreenProps {
	switch(action.type) {
    case 'POSTINFO_INCREMENT_LIKES': 
      return {
        ...state,
        postInfo: {
          post: {
            ...state.postInfo.post,          
            likes: action.data.likes,
          },
          comments: state.postInfo.comments
        }  
      }
    case 'FETCH_COMMENTS': 
      return {
        ...state,
        postInfo: {
          post: state.postInfo.post,
          comments: action.data.comments
        }  
      }
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
    case 'VIEW_PHOTO':
      const post = state.postInfo.post;
      return {
        ...state,
        postInfo: {
          post: {
            _id: action.post._id,
            caption: action.post.caption,
            likes: action.post.likes,
            display_src: action.post.display_src,
            totalComments: action.post.totalComments
          },
          comments: state.postInfo.comments
        }
      }
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
    // case 'GET_PHOTO_FAILURE':
    //   return {
    //     ...state,
    //     status: action.status
    //   }
    default:
    return state;
  }
}