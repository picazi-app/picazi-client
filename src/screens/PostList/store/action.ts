import axios from 'axios';
import getBaseUrl from "../../../helpers/config";
const apiUrl = getBaseUrl();

// Action Types
export enum ActionTypes {
  INCREMENT_LIKES = 'INCREMENT_LIKES',
  GET_POSTLIST = 'GET_POSTLIST',
  POSTLIST_FAILURE= 'POSTLIST_FAILURE',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
export interface IncrementAction {
  type: ActionTypes.INCREMENT_LIKES,
  index: number
}
function success(actionType: any, msg: any){
    return {
      type: actionType,
      data: msg,
    };
  }
function error(actionType: any, msg: any) {
  return {
    type: actionType,
    failure: msg
  };
}
export function getPostListData() {
  return (dispatch: any) => {
    return axios.get(`${apiUrl}/posts`, {withCredentials: true})
      .then(response => {
        dispatch(success(ActionTypes.GET_POSTLIST, response.data.posts))
      })
      .catch(err => {
        console.log(err)
        if(err.response) {
          dispatch(error(ActionTypes.POSTLIST_FAILURE, err.response))
        }
      });
  };
}

export function incrementLikes(postId: string, likes: number) {
  return (dispatch: any) => {
    return axios.patch(`${apiUrl}/posts/${postId}/likes`, {postId, likes},  {withCredentials: true})
      .then((response) => {
        console.log(response.data)
        dispatch(success(ActionTypes.INCREMENT_LIKES, response.data.post))
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function removeSinglePost(postId: string) {
  return (dispatch: any) => {
    return axios.delete(`${apiUrl}/posts/${postId}/`, {withCredentials: true})
      .then(response => {
        console.log(response.data)
        dispatch(success(ActionTypes.GET_POSTLIST, response.data.posts))
      })
      .catch(err=> {
        console.log(err.response);
        
      });
  };
}