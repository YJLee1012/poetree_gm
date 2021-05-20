import React, {useState,useEffect} from 'react'
import {SidebarContainer, Icon, CloseIcon,
SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './SidebarElements';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';


const Sidebar = ({isOpen, setIsOpen, toggle}) => {
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

    return(
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            {console.log('Sidebar:',isOpen)}
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink  onClick={()=>{
                        history.push('/about')
                        setIsOpen(!isOpen)}} >
                        소개
                    </SidebarLink>
                    <SidebarLink onClick={()=>{
                        history.push('/list')
                        setIsOpen(!isOpen)}}>
                        시 둘러보기
                    </SidebarLink>
                    <SidebarLink onClick={()=>{
                        history.push('/event')
                        setIsOpen(!isOpen)}}>
                        이벤트
                    </SidebarLink>
                    {user?.result ?(
                    <SidebarLink onClick={()=>{
                        history.push('/mypage')
                        setIsOpen(!isOpen)}}>
                        나의 시집
                    </SidebarLink>
                    ):(<></>)}
                </SidebarMenu>
                <SideBtnWrap>
                    {user?.result ? (
                        <SidebarRoute onClick={logout}>
                            logout
                        </SidebarRoute>

                    ) : (
                        <SidebarRoute to="/login">login</SidebarRoute>
                    )}
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}
export default Sidebar;