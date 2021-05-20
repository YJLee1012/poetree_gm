import styled from 'styled-components'
import {Link as LinkS } from 'react-scroll'
import {Link as LinkR} from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'

export const SidebarContainer = styled.aside`
    font-family: "Libre Baskerville", "Noto Sans KR", serif;
    position: fixed;
    z-index: 999;
    width: 20%;
    height: 100%;
    background : #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) =>(isOpen ? '85%' : '0')};
    left: ${({isOpen})=>(isOpen ? '0' : '-200%')};

    @media screen and (max-width: 768px){
        width: 100%;
        opacity: ${({isOpen}) =>(isOpen ? '100%' : '0')};
        left: ${({isOpen})=>(isOpen ? '0' : '0')};
        top: ${({isOpen})=>(isOpen ? '0' : '-200%')};
    }
`
export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    outline: none;
`

export const CloseIcon = styled(FaTimes)`
    color: #000;
`

export const SidebarWrapper = styled.div`
    color: #000;
`
export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-colums: 1fr;
    grid-template-rows: repeat(6,80px);
    text-align: center;
    padding:0;

    @media screen and (max-width: 480px){
        grid-template-rows: repeat(6,60px);
    }
`

export const SidebarLink = styled(LinkS)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: #fff;
    cursor: pointer;

    &:hover{
        color: #01bf71;
        transition: 0.2s ease-in-out;
    }
`

export const SideBtnWrap = styled.div`
    display: flex;
    justify-content: center;
`

export const SidebarRoute = styled(LinkR)`
    display:none;
    @media screen and (max-width: 768px){
        display:block;
            border-radius: 50px;
            background: #f7f5f1;
            white-space: nowrap;
            padding: 16px 64px;
            color: #010606;
            font-size: 16px;
            outline: none;
            border: 1px solid #c0c0c0;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            text-decoration: none;
        
            &:hover{
                transition: all 0.2s ease-in-out;
                background : #3e3e3e;
                color: #fff;
            }
        }

`