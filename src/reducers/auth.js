import {AUTH, LOGOUT} from '../constants/actionTypes';

const authReducer =(state = {authData : null }, action) => {
    switch(action.type){
        case AUTH:
            console.log('Auth action.data : ');
            console.log(action?.data);
            //localStorage에 저장
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            // Auth컴포넌트에서 넣어준 데이터 result와 token출력
            return {...state, authData: action?.data ,loading: false, errors: null};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null, loading : false, errors: null};
        default : 
            return state;
    }
}

export default authReducer;