import { bindActionCreators, Dispatch } from 'redux';
import { connect  }from 'react-redux';
import { actionCreators }from '../actions/actionCreators';
import Main from './Main';
import { Post } from '../store/types/posts';
import { UserComments } from '../store/types/comments';

interface AppContainerProps {
  posts: Post[];
  comments: UserComments;
}
function mapStateToProps(state : AppContainerProps) {
	console.log("state is", state)
	return {
		posts: state.posts,
		comments: state.comments
	}
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}
// you have your state values in store props that is in Provider
// and now you want these state values in child components and connect() helps you with that
//Connects listens to the store and get state from there

//The purpose of connect() is that you don't have to think about
// subscribing to the store or performance optimizations yourself, and
// instead you can specify how to get props based on Redux store state:
const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;