import { COMMENT, COM_UPDATE, COM_DELETE ,LIKER} from '../constants/actionTypes';

import * as api from '../api/index.js';


//댓글
export const createComment = (id, comment) => async (dispatch)=>{
    try{
        const {data} = await api.createComment(id, comment);
        dispatch({type: COMMENT, payload: data});
    }catch(error){
        console.log(error.message);
    }
  }
  
  export const updateComment = (id, commentId, comment) => async (dispatch) => {
    try {
        const { data } = await api.updateComment(id, commentId, comment);
    
        dispatch({ type: COM_UPDATE, payload: data });
      } catch (error) {
        console.log(error.message);
      }
  };
  
  export const deleteComment = (id, commentId) => async (dispatch) => {
    try {
      await api.deleteComment(id, commentId);
  
      dispatch({type: COM_DELETE , payload: commentId});
    } catch (error) {
      console.log(error.message);
    }
  };