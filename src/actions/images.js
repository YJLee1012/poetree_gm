import { IMG,IMGS,UPLOAD,GET_EIMG } from '../constants/actionTypes';


import * as api from '../api/index.js';

export const getImage = (id) => async (dispatch) => {
    try {
      const { data } = await api.getImage(id);
  
      dispatch({ type: IMG, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  export const getImages = () => async (dispatch) => {
    try {
      const { data } = await api.getImages();
  
      dispatch({ type: IMGS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  export const getEventImages = (des) => async (dispatch) => {
    try {
      const { data } = await api.getEventImages(des);
  
      dispatch({ type: GET_EIMG, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const imageUpload = (img) => async (dispatch) => {
    try {
      const { data } = await api.imageUpload(img);
  
      dispatch({ type: UPLOAD, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };