import { FETCH_ALL,GET_EVENTS,CREATE_EVENT, GET_POST, CREATE, UPDATE, DELETE, LIKE, HASHTAG, MY_POST,LIKED_POST} from '../constants/actionTypes';


import * as api from '../api/index.js';

export const getPosts = (type) => async (dispatch) => {
  try {
    const { data } = await api.getPosts(type);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getEvents = (type,event) => async (dispatch) => {
  try {
    const { data } = await api.getEvents(type,event);

    dispatch({ type: GET_EVENTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) =>{
  try{
    const {data} = await api.getPost(id);
    dispatch({type:GET_POST, payload: data});
  }catch(error){
    console.log(error.message);
  }
}
export const getmyPosts = () => async (dispatch) =>{
  try{
    const {data} = await api.getmyPosts();
    dispatch({type:MY_POST, payload: data});
  }catch(error){
    console.log(error.message);
  }
}
export const getlikedPosts = () => async (dispatch) =>{
  try{
    const {data} = await api.getlikedPosts();
    dispatch({type:LIKED_POST, payload: data});
  }catch(error){
    console.log(error.message);
  }
}

//postData는 작성한 정보값들 들어있는거
//Form.js에서 dispatch(createPost(postData))
export const createPost = (post,sourceId) => async (dispatch) => {
  try {
    // 백엔드 서버에 post api요청을 보내고 바로 거기에 post를 보냄.
    const { data } = await api.createPost(post,sourceId);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createEvent = (post,sourceId,event) => async (dispatch) => {
  try {
    const { data } = await api.createEvent(post,sourceId,event);

    dispatch({ type: CREATE_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  
  try{
    const { data } = await api.likePost(id);

    dispatch({type:LIKE, payload:data})
  }catch(error){
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    // data필요없으니 바로 호출
    await api.deletePost(id);

    dispatch({type: DELETE , payload: id});
  } catch (error) {
    console.log(error.message);
  }
};

export const getHashPosts = (tag) => async (dispatch) => {
  try {
    const { data } = await api.getHashPosts(tag);

    dispatch({ type: HASHTAG, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

