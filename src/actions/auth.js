import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const googlelogin = (googleData, router) => async (dispatch) => {
    try{
        const {data} = await api.googlelogin(googleData);//api호출 여기에서 안넘어가네..
        console.log('데이터출력',data);
        console.log('googlelogin 실행 성공');
        dispatch({type : AUTH, data});
        router.push('/');
    }catch(error){
        console.log(error);
    }
};

  