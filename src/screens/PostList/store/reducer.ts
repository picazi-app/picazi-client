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
			console.log("INCREMENTING Likes!!")
      const i = action.index;
      
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, i), //before the one we are updating
          {...state.posts[i], likes: state.posts[i].likes + 1},
          ...state.posts.slice(i+1), // after the one we are updating
        ]
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
