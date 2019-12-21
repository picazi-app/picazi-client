import { AnyAction } from "redux";

import { ActionTypes } from './action';
import { PostListScreenProps } from './types';

export const defaultPostListScreenProps: PostListScreenProps = {
  posts: [],
  totalPages: 1
}

export function posts(state: PostListScreenProps = defaultPostListScreenProps, action: AnyAction) : PostListScreenProps {
	switch(action.type) {
		case 'INCREMENT_LIKES' :
      let posts = state.posts;

      posts = posts.map(post => {
        if (post._id === action.data._id) {
          console.log(post)
          post.likes = action.data.likes;
        }
        return post;
      });

      return {
        ...state,        
        posts: posts
        
      }
    case ActionTypes.GET_POSTLIST:
    return {
      ...state,
      posts: action.data.posts,
      totalPages: action.data.totalPages

    }		
    case ActionTypes.POSTLIST_FAILURE:
    return {
      ...state,
      posts: [],
    }			
    default:
      return state;
	}
	
}
