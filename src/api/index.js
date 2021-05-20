import axios from 'axios';
 
const API = axios.create({ baseURL: "http://54.180.34.121:8080/" });

//각 요청들을 수행하기 위해서
//토큰을 백엔드로 보내야 백엔드 미들웨어는 실제로 로그인 했는지 알 수 있음
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const getPosts = (type) => API.get('/posts', {
  params : { orderType: `${type}`}
});
// 이벤트 게시물 조회
export const getEvents = (type,event)=>API.get('/events',{
  params : { orderType: `${type}` , event:`${event}`}
});

export const getPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost,sourceId) => API.post('/posts', newPost,{
  params: { SourceId: `${sourceId}`}
});
// 이벤트 게시물 생성
export const createEvent = (newPost,sourceId,event) => API.post('/events', newPost,{
  params: { SourceId: `${sourceId}`,event: `${event}`}
});
export const likePost = (id) => API.post(`/posts/${id}/like`);
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// export const getComments = () => API.get('');
export const createComment = (id, newComment) => API.post(`/posts/${id}/comment`,newComment);
export const updateComment = (id, commentId, updatedComment) => API.put(`/posts/${id}/${commentId}`, updatedComment);
export const deleteComment = (id, commentId) => API.delete(`/posts/${id}/${commentId}`);

export const getHashPosts = (tag) => API.get('/posts/hashtag',{
  params: { hashtag: `${tag}` }
});

export const googlelogin =(googleData) => API.post('/users/signIn',googleData);
export const getImage = (id) => API.get(`/sources/${id}`);
export const getImages = () => API.get('/sources');

export const imageUpload = (img) => API.post('/sources',img);

export const getmyPosts= () => API.get('users/mypage/myposts');
export const getlikedPosts = () => API.get('users/mypage/getLikedPosts');

export const getImagePosts = (sourceId,type) => API.get(`posts/sourcePosts/${sourceId}`,{
  params : {orderType:`${type}`}
});
export const getPrevImages = () => API.get('sources/previousImages');

// 이벤트 이미지 조회
export const getEventImages = (des) => API.get('events/getEventImages',{
  params : {description:`${des}`}
})