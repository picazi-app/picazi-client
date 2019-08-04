import axios from 'axios';
import getBaseUrl from "../../../helpers/config";
import { Post } from './types'
const apiUrl = `${getBaseUrl()}/posts`;

export enum ActionTypes {
  ADD_COMMENT = "ADD_COMMENT",
  REMOVE_COMMENT = "REMOVE_COMMENT",
  FETCH_COMMENTS = "FETCH_COMMENTS",
  FETCH_COMMENTS_SUCCESS = "FETCH_COMMENT_SUCCESS",
  FETCH_COMMENTS_FAILURE = "FETCH_COMMENT_FAILURE",
  VIEW_PHOTO = "VIEW_PHOTO",
  GET_PHOTO = "GET_PHOTO",
  GET_PHOTO_FAILURE = "GET_PHOTO_FAILURE"
}

export interface AddCommentAction {
  type: ActionTypes.ADD_COMMENT,
  postId: string,
  author: string,
  comment: string
}
export interface RemoveCommentAction {
  type: ActionTypes.REMOVE_COMMENT,
  postId: string
  index: number
}

export interface FetchCommentsAction {
  type: ActionTypes.FETCH_COMMENTS,
  postId: string
}

export interface ViewPhoto {
  type: ActionTypes.VIEW_PHOTO;
  post: Post
}
export type ActionPayloads = FetchCommentsAction | AddCommentAction | RemoveCommentAction | ViewPhoto;
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

// interface CommentResponseDataType {

//   "postCode": "BAcyDyQwcXX",
// "comments": [
// {
// "text": "Wes. WE should have lunch.",
// "user": "jdaveknox"
// },
// {
// "text": "#adults",
// "user": "jdaveknox"
// },
// {
// "text": "@jdaveknox yes!",
// "user": "wesbos"
// },
// {
// "text": "😍 love Hamilton!",
// "user": "willowtreemegs"
// }
// ]
// }

function success(actionType: any, data: any) {
  return {
    type: actionType,
    data: data
  }
}
function error(actionType : any, data: any) {
  return {
    type: actionType,
    data: data
  }
}
export function fetchComments(postId: string) {
  return (dispatch: any) => {
    return axios.get(`${apiUrl}/${postId}/comments`)
      .then(response => {
        dispatch(success(ActionTypes.FETCH_COMMENTS, response.data.comments))
      })
      .catch(error => {
        console.log(error);
        dispatch(error(ActionTypes.FETCH_COMMENTS_FAILURE, error))
        throw(error);
      });
  };
}

// Call an api to get photo details.
export function getPhoto(postId: string) {
  return (dispatch: any) => {
    return axios.get(`${apiUrl}/${postId}`)
      .then(response => {
        dispatch(success(ActionTypes.GET_PHOTO, response.data.post))
      })
      .catch((error)=> {
        // let err = error.response ? error.response.data.err : error.message;
        dispatch(error(ActionTypes.GET_PHOTO_FAILURE, error))
      })
  }
}

// Redirect people to http://localhost:3000/view/BAcJeJrQca9 if they come from http://localhost:3000/ page. 
export function viewPhoto(post: Post) : ViewPhoto{
  console.log(post)
  return {
    type: ActionTypes.VIEW_PHOTO,
    post: post
  }
}