export interface Post {
  code: string;
  caption: string;
  likes: number;
  id: string;
  display_src: string;
  totalComments: number;
}
export interface Comment {
  text: string;
  user: string;
}

export interface PostInfo {
  post: Post;
  comments: Comment[]
}
export interface PostInfoScreenProps {
  postInfo: PostInfo;
}
