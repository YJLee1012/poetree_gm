import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
import {Link as LinkS} from 'react-scroll'

export const Nav = styled.nav`
    background: none;
    // background-color:#fff;
    height: 80px;
    margin-top: -80px;
    display:flex;
    justify-content: center;
    align-items:center;
    font-size: 1rem;
    position: sticky;
    top:0;
    z-index:10;
    font-family: "Libre Baskerville", "Noto Sans KR", serif;


    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
`

export const NavbarContainer = styled.div`
    display:flex;
    justify-content:space-between;
    height: 80px;
    z-index:1;
    width: 100%;
    padding: 0 24px;
    // max-width: 1500px;
`
export const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-24px);
`

export const NavLogo = styled(LinkR)`
    color: #000;
    justify-self: flex-start;
    cursor:pointer;
    font-size:1.5rem;
    display: flex;
    align-items: center;
    margin-left:8px;
    text-decoration:none;

    &:hover{
        text-decoration:none;

    }
`

export const MobileIcon = styled.div`
    // display:none;
    // @media screen and (max-width: 768px){
    //     display:block;
    //     position:absolute;
    //     top:0;
    //     right:0;
    //     transform: translate(-100%,60%);
    //     font-size:1.8rem;
    //     cursor:pointer;
    //     color:#000;
    // }
        
        // position:absolute;
        // top:16px;
        // left:60px;
        // transform: translate(-100%,45%);
        transform: translateY(10px);
        font-size:1.8rem;
        cursor:pointer;
        color:#000;

        @media screen and (max-width: 768px){
             
             position:absolute;
             top:0px;
             right:8px;
            //  transform: translateX(240px);
            //  font-size:1.8rem;
            //  cursor:pointer;
            //  color:#000;
         }
`

export const NavMenu = styled.ul`
    display:flex;
    align-items: center;
    list-style: none;
    text-align: center;
    // margin-right: 700px;
    font-family: "Libre Baskerville", "Noto Sans KR", serif;
    font-size: 18px;

    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavItem = styled.li`
    height: 80px;
`

export const NavLinks = styled(LinkR)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height : 100%;
    cursor: pointer;

    &.active {
        // 해당 링크로 이동시 밑줄 표시
        border-bottom: 3px solid #01bf71;

    }
`
export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavBtnLink = styled(LinkR)`
    margin: 0 10px;
    // border: 1px solid lightgrey;
    border-radius: 100px;
    background: #fff;
    white-space: nowrap;
    padding: 10px;
    color: #010606;
    // font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    opacity: 85%;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #e3e3e3;
        // color: #fff;
    }
`
export const Modal = styled.div`
    width: 100px;
    // height: 100%;
    position:absolute;
    top:70px;
    right: 30px;
    background-color:#e3e3e3;
    border-radius:10px;
    padding: 8px;
`

export const ModalMenu = styled.ul`
    padding: 0 8px 0 0;
    margin: 0 auto;
    list-style: none;
    text-align: left;
    font-family: "Libre Baskerville", "Noto Sans KR", serif;
    font-size: 16px;

    @media screen and (max-width: 768px){
        display: none;
    }
`
export const ModalLinks =styled(LinkR)`
    color: #000;
    // text-decoration: underline;
    height : 100%;
    cursor: pointer;

    &.active {
        // 해당 링크로 이동시 밑줄 표시
        border-bottom: 3px solid #01bf71;

    }

`

export const ModalItem = styled.li`
    height: 30px;
`
