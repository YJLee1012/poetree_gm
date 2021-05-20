import { HASHTAG,MY_POST,LIKED_POST } from '../constants/actionTypes';

                //(state,action)
export default (hashmyposts=[], action)=>{
    switch(action.type){
        case HASHTAG:
            return action.payload;
        case MY_POST:
            return action.payload;
        case LIKED_POST:
            return action.payload;
        default:
            return hashmyposts;
    }
}
