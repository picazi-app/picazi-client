import { AnyAction } from "redux";

import { ActionTypes } from './action';
import { PostListScreenProps } from './types';

export const defaultPostListScreenProps: PostListScreenProps = {
  posts: [],
  totalPages: 0,
  loading: false,
}

export function posts(state: PostListScreenProps = defaultPostListScreenProps, action: AnyAction) : PostListScreenProps {
	switch(action.type) {
		case ActionTypes.INCREMENT_LIKES:
      let posts = state.posts;

      posts = posts.map(post => {
        if (post._id === action.data._id) {
          post.likes = action.data.likes;
        }
        return post;
      });

      return {
        ...state,        
        posts: posts
        
      }

    case ActionTypes.FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.data.posts],
        totalPages: action.data.totalPages,
        loading: false,
      }

    case ActionTypes.FETCH_LATEST_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    
    case ActionTypes.FETCH_LATEST_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.data.posts,
        totalPages: action.data.totalPages,
        loading: false,
      }

    case ActionTypes.FETCH_POSTLIST_FAILURE:
      return {
        ...state,
        posts: [],
      }
      case ActionTypes.DELETE_POST_SUCCESS:
        return {
          ...state,
          posts: state.posts.filter((item, index) => item._id !== action.data.postId),
          loading: false,
        }

    default:
      return state;
	}
	
}
