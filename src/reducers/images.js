import { IMG, IMGS, UPLOAD,GET_EIMG } from '../constants/actionTypes';

                //(state,action)
export default (images=[], action)=>{
    switch(action.type){
        case IMG :
            return action.payload;
        case IMGS :
            return action.payload;
        case UPLOAD :
            return [...images, action.payload];
        case GET_EIMG :
            return action.payload;
        default:
            return images;
    }
}
