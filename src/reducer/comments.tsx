import { ActionTypes, ActionPayloads } from '../actions/actionCreators';
import { Comment, UserComments} from '../store/types/comments';

const defaultComments: UserComments = {};

function postComments(state: Comment[], action: ActionPayloads | any) : Comment[] {
	console.log("state inside comments reducer postComments", state)
	switch(action.type) {
    case 'ADD_COMMENT':
			//return the new state with new comment
			return [
        ...state, {
          user: action.author,
          text: action.comment
        }
      ];
			case 'REMOVE_COMMENT':
				return [
					...state.slice(0, action.index),
					...state.slice(action.index + 1)
				];
			default:
				return state;
	}
	return state;
}

function comments(state: UserComments = defaultComments, action: ActionPayloads | any) : UserComments {
	console.log("action inside comments reducer", action)
	console.log('state inside comments reducer comments', state)
	if(typeof action.postId !== 'undefined') {
		return {
			//take the current state
			...state,
			//overwrite this post with a new one
			[action.postId]: postComments(state[action.postId], action)
		}
	}
	return state;
}

export default comments;