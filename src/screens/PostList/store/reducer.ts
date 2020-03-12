import { AnyAction } from "redux";

import { ActionTypes } from './action';
import { PostListScreenProps } from './types';

export const defaultPostListScreenProps: PostListScreenProps = {
  posts: [],
  totalPages: 0,
  scroll: false,
  // page: 1
}

export function posts(state: PostListScreenProps = defaultPostListScreenProps, action: AnyAction) : PostListScreenProps {
	switch(action.type) {
		case ActionTypes.INCREMENT_LIKES :
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

    case ActionTypes.GET_POSTLIST_REQUEST:
      return {
        ...state,
        scroll: true
      }

    case ActionTypes.GET_POSTLIST_SUCCESS:
      console.log(action)
      return {
        ...state,
        posts: [...state.posts, ...action.data.posts],
        totalPages: action.data.totalPages,
        scroll: false,
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
