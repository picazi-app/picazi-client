import { combineReducers, Reducer} from 'redux';
import { routerReducer } from 'react-router-redux';
import { Post } from '../store/types/posts'
import posts from './posts';
import comments from './comments';
import { UserComments } from '../store/types/comments';

const appReducer = combineReducers({posts, comments, routing: routerReducer});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
}

export default rootReducer;