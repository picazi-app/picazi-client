export interface Post {
  _id: string;
  caption: string;
  likes: number;
  display_src: string;
  totalComments: number;
}
export interface Comment {
  _id: string;
  text: string;
  username: string;
}

export interface PostInfo {
  post: Post;
  comments: Comment[]
}
export interface PostInfoScreenProps {
  postInfo: PostInfo;
}
