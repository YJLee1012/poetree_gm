import React, { useState, useEffect } from 'react';

import {FaBars} from 'react-icons/fa'
import {Nav, NavbarContainer, Logo, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks
, NavBtn, NavBtnLink} from './NavbarElement';
import {Modal,ModalMenu,ModalLinks,ModalItem} from './NavbarElement';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import poetreeLogo from '../../img/favicon.png';
import * as actionType from '../../constants/actionTypes';

import personLogo from '../../img/user.png'


const Navbar = ({toggle}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [pop,setPop] = useState(false);
    
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

    const clickModal = () => {
        setPop(!pop)
    }
    return(
        <>
           <Nav>
               <NavbarContainer>
                   <MobileIcon onClick={toggle}>
                       <FaBars />
                   </MobileIcon>
                   <Logo>
                       <img src={poetreeLogo} alt="icon" height="48" />
                       <NavLogo to='/' style={{color:'#3e3e3e', fontFamily:'Satisfy', fontSize:'28px'}} >poetree</NavLogo>
                   </Logo>
                   
                   {(pop===true)?(
                   <Modal>
                       <ModalMenu>
                           <ModalItem>
                                <ModalLinks to="mypage" onClick={clickModal}>mypage</ModalLinks>
                           </ModalItem>
                           <ModalItem onClick={clickModal}>
                                <ModalLinks onClick={logout}>logout</ModalLinks>
                           </ModalItem>
                           {user?.result.role === 'admin' ? (
                           <ModalItem>
                                <ModalLinks to="admin" onClick={clickModal}>admin</ModalLinks>
                           </ModalItem>
                           ):(<></>)}
                       </ModalMenu>
                   </Modal>)
                   :(<></>)}
                   <NavBtn>
                   {user?.result ? (
                        <NavBtnLink onClick={clickModal}>
                            <img src={personLogo} style={{width:'24px', heigth:'24px'}}/>
                        </NavBtnLink>
                        // <NavBtnLink onClick={logout}>
                        //     <img src={personLogo} style={{width:'32px', heigth:'32px', border:'0px'}}/>
                        // </NavBtnLink>
                    ) : (
                       <NavBtnLink to="/login">
                            <img src={personLogo} style={{width:'24px', heigth:'24px'}}/>
                       </NavBtnLink>
                    )}
                    {/* {user?.result.role === 'admin' ? (
                        <NavBtnLink to="/admin">admin</NavBtnLink>
                    ) : (
                       <></>
                    )} */}
                   </NavBtn>
               </NavbarContainer>
           </Nav>
        </>
    );
};

// function Modal(){
//     <div className="modal">
//         {console.log('hi')}
//     </div>
// }

export default Navbar;