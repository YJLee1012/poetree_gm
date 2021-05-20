import { GET_EVENTS,CREATE_EVENT} from '../constants/actionTypes';

                //(state,action)
export default (events=[], action)=>{
    switch(action.type){        
        case GET_EVENTS:
            return action.payload;
        case CREATE_EVENT:
            return [...events, action.payload]; 
        default:
            return events;
    }
}
