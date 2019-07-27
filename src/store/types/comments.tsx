export interface Comment {
  text: string;
  user: string;
}

export interface UserComments {
  [key: string]: Comment[]
}