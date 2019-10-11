import axios from 'axios';
import getBaseUrl from "../../../helpers/config";
import { UserActionTypes } from '../../../store/action';
const apiUrl = getBaseUrl();
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.REACT_APP_PRODUCTION_BACKEND_BASE_URL", process.env.REACT_APP_PRODUCTION_BACKEND_BASE_URL);
console.log("apiUrl", apiUrl);


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
      })
      .catch(err=> {
        console.log(err.response);
      });
  };
}

