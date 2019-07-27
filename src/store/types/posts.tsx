export interface Post {
  code: string;
  caption: string;
  likes: number,
  id: string;
  display_src: string;
}


export type PostList = Post[];