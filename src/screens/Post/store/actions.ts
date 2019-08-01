export enum ActionTypes {
  ADD_COMMENT = "ADD_COMMENT",
  REMOVE_COMMENT = "REMOVE_COMMENT",
  FETCH_COMMENTS = "FETCH_COMMENTS"
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

export interface FetchCommentsAction{
  type: ActionTypes.FETCH_COMMENTS,
  postId: string
}

export type ActionPayloads = FetchCommentsAction | AddCommentAction | RemoveCommentAction;
//actions are just Objects
export const actionCreators = {

  fetchCommentsForPost: (postId: string) : FetchCommentsAction => {
    return {
      type: ActionTypes.FETCH_COMMENTS,
      postId: postId,
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
  },
}