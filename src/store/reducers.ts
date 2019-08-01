import { routerReducer } from 'react-router-redux';

import { reducers as registrationReducer} from '../screens/Register/store/reducer';
import { posts as postsReducer } from '../screens/PostList/store/reducer'
import { postComments as postCommentsReducer} from '../screens/Post/store/reducer'

import { combineReducers } from 'redux';

const appReducer = combineReducers({
  registration_screen: registrationReducer,
  postList_screen: postsReducer,
  postInfo_screen: postCommentsReducer,
  routing: routerReducer
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
}

export default rootReducer;