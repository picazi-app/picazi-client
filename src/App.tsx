import React from 'react';
import PostInfo from './screens/Post/containers/PostInfo';
import PhotoGrid from './screens/PostList/container/PhotoGrid';

import {
  Route,
  Switch,
  Link,
  RouteComponentProps,
} from "react-router-dom";

import { PostList } from "./screens/PostList/store/types";
import { Comment, Post } from './screens/Post/store/types';
import { AddCommentAction, RemoveCommentAction } from './screens/Post/store/actions';
import LoginPage from './screens/Login/components/LoginPage'
import RegisterPage from './screens/Register/components/RegisterPage';
interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>
interface MainProps {
  posts: PostList;
  post: Post;
  comments: Comment[];
  // params: ParamsProps;
  addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  removeComment: (postId: string, i: number) => RemoveCommentAction;
}
type Props = OwnProps & MainProps;

class App extends React.Component<Props> {
  
	render(){
		return(
			<div>
        <div>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>SignUp</button></Link>
        </div>
				<h1>
					<Link to="/">Reduxstagram</Link>
				</h1>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={RegisterPage} />
          <Route path="/view/:postId" component={() => (<PostInfo  {...this.props}/>)}/>
          <Route component={() =>(
            <PhotoGrid {...this.props}/>
          )}/>
        </Switch>
			</div>
		)
	}
}

// export default withRouter(Main);
export default App;
