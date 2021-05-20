import { FETCH_ALL,GET_EVENTS,CREATE_EVENT, GET_POST, CREATE, UPDATE, DELETE, LIKE, HASHTAG, LIKER,MY_POST,LIKED_POST} from '../constants/actionTypes';

                //(state,action)
export default (posts=[], action)=>{
    switch(action.type){
        // FETCH_ALL 모든 posts(게시물)을 가져오기
        case FETCH_ALL:
            return action.payload;
        case GET_POST:
            return action.payload;
        case MY_POST:
            return action.payload;
        case LIKED_POST:
            return action.payload;
        case HASHTAG:
            return action.payload;

        case CREATE :
            // payload값은 acion에서 정의한 것 참조(data : post를 담고있어), 
            //components의 Form에서 postData state 배열 값이 데이터
            sessionStorage.setItem('data',JSON.stringify({...action?.payload}))

            return [...posts, action.payload];
        case UPDATE :
            // post._id? 왜
            // map함수는 change array해서 반환
            //action.payload는 update된 게시물
            // 게시물 id가 update된 게시물의 아이디와 같으면 update된 게시물을 반환
            return posts.map((post)=>post.id === action.payload.id ? 
            action.payload : post)
        case DELETE:
            // 하나빼고 모두 return
            return posts.filter((post)=> post.id !== action.payload);
        case LIKE :
            // update랑 똑같아
            return posts.map((post)=>post.id === action.payload.id ? 
            action.payload : post)
        default:
            return posts;
    }
}
