import axios from 'axios';
import getBaseUrl from "../../../helpers/config";
import { Post } from './types'
import { UserActionTypes } from '../../../store/action';
import { Comment } from './types'
const apiUrl = `${getBaseUrl()}`;


export enum ActionTypes {
  SAVE_COMMENTS = "SAVE_COMMENTS",
  SAVE_COMMENTS_FAILURE="SAVE_COMMENTS_FAILURE",

  REMOVE_COMMENT = "REMOVE_COMMENT",

  REMOVE_POST = "REMOVE_POST",

  FETCH_COMMENTS = "FETCH_COMMENTS",
  FETCH_COMMENTS_SUCCESS = "FETCH_COMMENT_SUCCESS",
  FETCH_COMMENTS_FAILURE = "FETCH_COMMENT_FAILURE",

  GET_PHOTO = "GET_PHOTO",
  GET_PHOTO_FAILURE = "GET_PHOTO_FAILURE",

  POSTINFO_INCREMENT_LIKES = "POSTINFO_INCREMENT_LIKES"
}

// export interface AddCommentAction {
//   type: ActionTypes.ADD_COMMENT,
//   postId: string,
//   author: string,
//   comment: string
// }
export interface RemoveCommentAction {
  type: ActionTypes.REMOVE_COMMENT,
  postId: string
  index: number
}


function success(actionType: any, data: any) {
  return {
    type: actionType,
    data: data
  }
}
function error(actionType : any, data: any) {
  return {
    type: actionType,
    data: data,
  }
}

export function fetchComments(postId: string) {
  return (dispatch: any) => {
    return axios.get(`${apiUrl}/posts/${postId}/comments`)
      .then(response => {
        dispatch(success(ActionTypes.FETCH_COMMENTS, response.data.comments))
      })
      .catch(err=> {
        console.log(err.response);
        if(err.response) {
          // dispatch(error(ActionTypes.FETCH_COMMENTS_FAILURE, err.response))
          return dispatch(error(UserActionTypes.NOT_FOUND_ERROR, err.response))
        }
      });
  };
}

export function saveComment(postId: string, comment: string) {
  return (dispatch: any) => {
    return axios.post(`${apiUrl}/posts/${postId}/comments`, {comment}, {withCredentials: true})
      .then(response => {
        dispatch(success(ActionTypes.SAVE_COMMENTS, response.data.comments))
      })
      .catch(err=> {
        console.log(err.response);
        if(err.response) {
          dispatch(error(ActionTypes.SAVE_COMMENTS_FAILURE, err.response))
        }
      });
  };
}

// Call an api to get photo details.
export function getPhoto(postId: string) {
  return (dispatch: any) => {
    return axios.get(`${apiUrl}/posts/${postId}`, 
      { headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      }})
      .then(response => {
        return dispatch(success(ActionTypes.GET_PHOTO, response.data.post))
      })
      .catch((err)=> {
        // let err = error.response ? error.response.data.err : error.message;
        console.log(err.response)
        // return dispatch(error(ActionTypes.GET_PHOTO_FAILURE, err))
        if(err.response){
          return dispatch(error(UserActionTypes.NOT_FOUND_ERROR, err.response))
        }
      })
  }
}

export function incrementLikes(postId: string, likes: number) {
  return (dispatch: any) => {
    return axios.patch(`${apiUrl}/posts/${postId}/likes`, {postId, likes},  {withCredentials: true})
      .then((response) => {
        console.log(response.data)
        dispatch(success(ActionTypes.POSTINFO_INCREMENT_LIKES, response.data.post))
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function removeComment(postId: string, commentId: string) {
  return (dispatch: any) => {
    return axios.delete(`${apiUrl}/posts/${postId}/comments/`, {withCredentials: true ,data: {commentId: commentId}})
      .then(response => {
        dispatch(success(ActionTypes.FETCH_COMMENTS, response.data.comments))
      })
      .catch(err=> {
        console.log(err.response);
        if(err.response) {
            console.log(err);
          return dispatch(error(UserActionTypes.NOT_FOUND_ERROR, err.response))
        }
      });
  };
}

export function removeSinglePost(postId: string) {
  return (dispatch: any) => {
    return axios.delete(`${apiUrl}/posts/${postId}/`, {withCredentials: true})
      .then(response => {
        console.log(response.data)
        // dispatch(success(ActionTypes.FETCH_COMMENTS, response.data.comments))
      })
      .catch(err=> {
        console.log(err.response);
        // if(err.response) {
        //     console.log(err);
        //   // return dispatch(error(UserActionTypes.NOT_FOUND_ERROR, err.response))
        // }
      });
  };
}

// Redirect people to http://localhost:3000/view/BAcJeJrQca9 if they come from http://localhost:3000/ page. 
// export function viewPhoto(post: Post) : ViewPhoto{
//   console.log(post)
//   return {
//     type: ActionTypes.VIEW_PHOTO,
//     post: post
//   }
// }