import axios from 'axios';
import getBaseUrl from "../../../helpers/config";
import { func } from 'prop-types';
const apiUrl = `${getBaseUrl()}`;

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

// export const actionCreators = {
//   increment:
//    (index: number) : IncrementAction=> {
//     return {
//       type: ActionTypes.INCREMENT_LIKES,
//       index: index
//     }
//   }
// }
// //action Type
// export const GET_POSTLIST = 'GET_POSTLIST';
// export const SUCCESS = 'SUCCESS';
// export const FAILURE = 'FAILURE';

// export interface SuccessReturnType {
//   type: ActionTypes.GET_POSTLIST
//   status: ActionTypes.SUCCESS
//   data: PostListResponseDataType
// }

interface PostListResponseDataType {
  caption: string;
  likes: number;
  display_src: string;
  totalComments: number;
}

// function success(actionType: any, msg: PostListResponseDataType){
//   return {
//     type: actionType,
//     data: msg,
//   };
// }
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
// get all the question
// export const getQuestions = () => {
//   return async (dispatch) => {
//     // dispatch(startRequest(GET_QUESTIONS_REQUESTING));
//     const path = config.base_url + `/api/v1/question/get_questions`;
//     try {
//       const response = await axios({
//         method: 'get',
//         url: path
//       });
//       dispatch(successRequest(GET_POSTLIST, response.data));
//     } catch (e) {
//       console.log(e);
//       let err = e.response ? e.response.data.err : e.message;
//       dispatch(failureRequest(GET_QUESTIONS_FAILURE, err));
//     }
//   };
// };
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