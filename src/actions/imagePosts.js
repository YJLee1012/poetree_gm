import { IMG_POSTS, PREV_IMG } from '../constants/actionTypes';


import * as api from '../api/index.js';

export const getImagePosts = (id,type) => async (dispatch) => {
    try {
      const { data } = await api.getImagePosts(id,type);
  
      dispatch({ type: IMG_POSTS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  export const getPrevImages = () => async (dispatch) => {
    try {
      const { data } = await api.getPrevImages();
  
      dispatch({ type: PREV_IMG, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };