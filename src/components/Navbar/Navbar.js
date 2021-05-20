import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import poetreeLogo from '../../img/favicon.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    
    useEffect(() => {
        const token = user?.token;
        
        if (token) {
        const decodedToken = decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/login');

        setUser(null);
    };


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img className={classes.image} src={poetreeLogo} alt="icon" height="48" />
        <Typography variant="h6" component={Link} to="/" className={classes.heading} align="center" style={{color:'#3e3e3e', fontFamily:'Nanum Myeongjo', fontWeight:'700', fontSize:'20px'}}>poetree</Typography>
      </div>
      <div className={classes.menus}>
        <Typography className={classes.menu} variant="p" component={Link} to="/list" align="center" style={{color:'#3e3e3e', fontFamily:'Nanum Myeongjo'}}>소개</Typography>
        <Typography className={classes.menu} variant="p" component={Link} to="/list" align="center" style={{color:'#3e3e3e', fontFamily:'Nanum Myeongjo'}}>둘러보기</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
              {/* user 이미지는 user 이름의 첫글자만 보여지게 */}
            <Avatar className={classes.purple} alt={user?.result.name}>{user?.result.name.charAt(0)}</Avatar>
            {/* 나중에 name이 아니라 nick으로 바꿔야할듯 */}
            <Typography className={classes.userName} >{`안녕하세요, ${user?.result.name}님`}</Typography>
            <Button variant="outlined" className={classes.logout} onClick={logout}>로그아웃</Button>
          </div>
        ) : (
          <Button component={Link} to="/login" variant="outlined" >로그인</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;