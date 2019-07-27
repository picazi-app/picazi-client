import { Comment } from '../store/types/comments';

export enum ActionTypes {
  INCREMENT_LIKES = "INCREMENT_LIKES",
  ADD_COMMENT = "ADD_COMMENT",
  REMOVE_COMMENT = "REMOVE_COMMENT"
}

export interface IncrementAction {
  type: ActionTypes.INCREMENT_LIKES,
  index: number
}
export interface AddCommentAction {
  type: ActionTypes.ADD_COMMENT,
  postId: string,
  author: string,
  comment: string
}
export interface RemoveCommentAction{
  type: ActionTypes.REMOVE_COMMENT,
  postId: string
  index: number
}

export type ActionPayloads = IncrementAction | AddCommentAction | RemoveCommentAction;
//actions are just Objects
export const actionCreators = {
  increment: (index: number) : IncrementAction=> {
    return {
      type: ActionTypes.INCREMENT_LIKES,
      index: index
    }
  },
  
  //add comment
  addComment: (postId: string, author: string, comment: string ) : AddCommentAction => {
    console.log("dispatching add comment")
    return {
      type: ActionTypes.ADD_COMMENT,
      postId: postId,
      author: author,
      comment: comment
    }
  },
  
  //remove comment from a particular posts
  removeComment: (postId: string, index: number) : RemoveCommentAction=> {
    return {
      type: ActionTypes.REMOVE_COMMENT,
      postId,
      index
    }
  }
}
