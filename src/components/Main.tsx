import React from 'react';
import Single from './Single';
import PhotoGrid from './PhotoGrid';
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  Link,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { Post } from "../store/types/posts";
import { UserComments } from '../store/types/comments';
import { AddCommentAction, RemoveCommentAction } from '../actions/actionCreators';

interface MatchParams {
  postId: string
}
type OwnProps = RouteComponentProps<MatchParams>
interface MainProps {
  posts: Post[];
  comments: UserComments;
  increment: (index:number) => void;
  // params: ParamsProps;
  addComment: (postId: string, author: string, comment: string) => AddCommentAction;
  removeComment: (postId: string, i: number) => RemoveCommentAction;
  index: number;
}
type Props = OwnProps & MainProps;

class Main extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
	render(){
    const { match } = this.props;
    console.log(match)
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
          <Route exact path="/view/:postId" component={() => (<Single  {...this.props}/>)}/>
          <Route component={() =>(
            <PhotoGrid {...this.props}/>
          )}/>
        </Switch>
			</div>
		)
	}
}

// export default withRouter(Main);
export default Main;