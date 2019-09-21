// MAKE REDUCER FOR EACH PART OF THE STATE
// IMPORTANT: Every reducer will be run on every actions so we'll have to
// write the logic which reducer to call specifically

// a reducer takes in two things
//1.  the action (info about what happened)
//2. copy about current State
import { AnyAction } from "redux";

import { ActionTypes } from './action';
import { PostListScreenProps } from './types';

export const defaultPostListScreenProps: PostListScreenProps = {
  posts: [],
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
      posts: action.data,

    }		
    case ActionTypes.POSTLIST_FAILURE:
    return {
      ...state,
      posts: [],
    }			
    default:
      return state;
	}
	
	//state[action.index].likes++; we're mutating the state
	
}

// export const initialState = {
//   status: '',
//   posts: []
// }

// export function getAllPostList(state: PostListScreenProps = defaultPostListScreenProps, action: AnyAction): PostListScreenProps {
// 	switch(action.type) {
// 		case ActionTypes.GET_POSTLIST:
//       return {
//         ...state,
//         posts: action.data
//       }			
// 	 		default:
// 	 			return state;
// 	}
	
// 	//state[action.index].likes++; we're mutating the state
	
// }
