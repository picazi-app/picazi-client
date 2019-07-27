// MAKE REDUCER FOR EACH PART OF THE STATE
// IMPORTANT: Every reducer will be run on every actions so we'll have to
// write the logic which reducer to call specifically

// a reducer takes in two things
//1.  the action (info about what happened)
//2. copy about current State
import { AnyAction } from "redux";

import { ActionTypes, ActionPayloads, RemoveCommentAction, IncrementAction } from '../actions/actionCreators';
import { Post } from '../store/types/posts';

const defaultValues: Post[] = [];

function posts(state: Post[] = defaultValues, action: IncrementAction | AnyAction) : Post[] {
	switch(action.type) {
		case 'INCREMENT_LIKES' :
			console.log("INCREMENTING Likes!!")
	 		const i = action.index;
	 		return [
	 			...state.slice(0, i), //before the one we are updating
	 			{...state[i], likes: state[i].likes + 1},
	 			...state.slice(i+1), // after the one we are updating
	 		]
	 		default:
	 			return state;
	}
	
	//state[action.index].likes++; we're mutating the state
	
	
}

export default posts;

// export default (state: Post[], action: ActionPayloads) => posts(state, action as ActionPayloads);