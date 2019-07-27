import React from 'react';
import Photo from './Photo';
import { Post } from "../store/types/posts";
import { UserComments } from '../store/types/comments';
interface PhotoGridProps {
  posts: Post[];
  comments: UserComments;
  increment: (index:number) => void;
}

class PhotoGrid extends React.Component<PhotoGridProps> {
	render(){
    console.log(this.props.posts);
		return(
			<div className="photo-grid">
				{this.props.posts.map((post, i)=> 
					<Photo {...this.props} key={i} index={i} post={post} />)}
			</div>
		)
	}
}

export default PhotoGrid;