import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {Paper, Container,Typography } from '@material-ui/core';
import useStyles from './styles';
import { googlelogin } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

export const Auth = () => {
    const [isSignup,setIsSignup]= useState(false);
    // {isSignup ? 'Sign Up' : 'Sign In'}
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const googleSuccess =async (res) => {
        //?. 연산자에 액세스 할 수 없는 경우 오류가 발생하지 않게, profileObj가 존재하지 않아도 오류가 발생하지 않아

        const googleData={
            name : res.profileObj.name,
            email : res.profileObj.email,
            provider : 'Google',
            image : res.profileObj.imageUrl,
        };
        
        try{
            dispatch(googlelogin(googleData,history));
        }catch(error){
            console.log(error)
        }
    }
    const googleFailure =(error) => {
        console.log(error);
        console.log('google sign in was unsseccssful.Try again later');
    }

    
    return (
        <div>
            <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
            <Typography component="h1" variant="h5"> 로그인 </Typography>
            <form className={classes.form} >
                <GoogleLogin
                    clientId="607844855850-f6ob1uhc34ttp1jveo1sbl679vae832l.apps.googleusercontent.com"
                    buttonText="구글로 로그인하기"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cooliePlicy={'single_host_origin'}
                />
            </form>
            </Paper>
            </Container>
        </div>
    )
}
export default Auth
