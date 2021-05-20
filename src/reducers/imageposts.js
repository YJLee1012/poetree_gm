import { IMG_POSTS, PREV_IMG, GET_EIMG } from '../constants/actionTypes';

                //(state,action)
export default (imageposts=[], action)=>{
    switch(action.type){
        case IMG_POSTS :
            return action.payload;
        case PREV_IMG :
            return action.payload;
        default:
            return imageposts;
    }
}
