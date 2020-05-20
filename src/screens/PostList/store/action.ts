import axios from 'axios';
import getBaseUrl from "../../../helpers/config.js";
const apiUrl = getBaseUrl();

// Action Types
export enum ActionTypes {
  TOGGLE_LIKE = 'TOGGLE_LIKE',

  FETCH_LATEST_POSTS_REQUEST = 'FETCH_LATEST_POSTS_REQUEST',
  FETCH_LATEST_POSTS_SUCCESS = 'FETCH_LATEST_POSTS_SUCCESS',

  FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST',  
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',

  FETCH_POSTLIST_FAILURE = 'FETCH_POSTLIST_FAILURE',

  DELETE_POST_REQUEST = 'DELETE_POST_REQUEST',
  DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS',
  DELETE_POST_FAILURE = 'DELETE_POST_FAILURE',

}
export interface IncrementAction {
  type: ActionTypes.TOGGLE_LIKE,
  index: number
}
function success(actionType: any, data: any){
    return {
      type: actionType,
      data: data,
    };
  }
function error(actionType: any, msg: any) {
  return {
    type: actionType,
    failure: msg
  };
}

export function fetchLatestPosts() {
  return (dispatch: any) => {
    dispatch({type: ActionTypes.FETCH_LATEST_POSTS_REQUEST});
    return axios.get(`${apiUrl}/posts?page=${1}`, {withCredentials: true})
      .then(response => {
        dispatch(success(ActionTypes.FETCH_LATEST_POSTS_SUCCESS, response.data))
      })
      .catch(err => {
        if(err.response) {
          dispatch(error(ActionTypes.FETCH_POSTLIST_FAILURE, err.response))
        }
      });
  };
}

export function fetchPosts(page: number) {
  return (dispatch: any) => {
    dispatch({type: ActionTypes.FETCH_POSTS_REQUEST});
    return axios.get(`${apiUrl}/posts?page=${page}`, {withCredentials: true})
      .then(response => {
        dispatch(success(ActionTypes.FETCH_POSTS_SUCCESS, response.data))
      })
      .catch(err => {
        if(err.response) {
          dispatch(error(ActionTypes.FETCH_POSTLIST_FAILURE, err.response))
        }
      });
  };
}

export function toggleLike(postId: string, likes: number) {
  return (dispatch: any) => {
    return axios.patch(`${apiUrl}/posts/${postId}/likes`, {postId, likes},  {withCredentials: true})
      .then((response) => {
        dispatch(success(ActionTypes.TOGGLE_LIKE, response.data))
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function removeSinglePost(postId: string) {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch({type: ActionTypes.DELETE_POST_REQUEST});
      return axios.delete(`${apiUrl}/posts/${postId}/`, {withCredentials: true})
        .then(response => {
          dispatch(success(ActionTypes.DELETE_POST_SUCCESS, response.data))
          resolve();
        })
        .catch(err=> {
          dispatch(error(ActionTypes.DELETE_POST_FAILURE, err.message))
          reject()
        });
    });
  }
}