import {GET_POST, COMMENT, COM_UPDATE, COM_DELETE} from '../constants/actionTypes';

export default (comments=[],action)=>{
    switch(action.type){
        // getPost했을 때 comments불러와짐
        case GET_POST: 
            return action.payload.comments
        case COMMENT:
            return [...comments, action.payload.comment]
        case COM_UPDATE:
            return comments.map((comment)=>comment.id === action.payload.commentId?
            action.payload.comment : comment)
        case COM_DELETE:
            return comments.filter((comment)=>comment.id !== action.payload)
        default:
            return comments
    }
}
