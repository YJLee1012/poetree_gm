import React, { Component, useEffect, useState } from 'react'
import './Mypage.css'
import { Nav } from 'react-bootstrap';
import { Grid, CircularProgress } from '@material-ui/core';


import {useDispatch,useSelector} from 'react-redux';

import {getmyPosts,getlikedPosts} from '../../actions/posts'

import MyPost from './MyPost'


const Mypage=({ setCurrentId, setSourceId})=>{

        let [name,setName] = useState('');

        const images = useSelector((state)=>state.images);

        let [tab,setTab] = useState(0);

        const dispatch = useDispatch();

        const user = JSON.parse(localStorage.getItem('profile'));
        
        useEffect(()=>{
                if(user) setName(user.result.name);    
                dispatch(getmyPosts());                    

        },[])

        const myPost = useSelector((state)=>state.hashmyposts);
        console.log('myPost',myPost);
        


        return( 
        <div className="Mypage">
                <div className="container">
                        <div className="user">
                          <img src={user?.result.image} style={{borderRadius:'100px'}}></img>
                          <div className="user-info">
                            <div className="user-name"> {name} </div>
                              <div className=""> {name}님의 작품을 확인해보세요. </div>
                          </div>
                        </div>

                        {/* tab버튼들 만들어 */}
                <Nav className= "mt-5 tab" variant="tabs" defaultActiveKey="tab-0">
                <Nav.Item>
                <Nav.Link className="tab_name" eventKey="tab-0" onClick={()=>{
                        setTab(0)
                        dispatch(getmyPosts())
                        }}>My Poetree</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link className="tab_name" eventKey="tab-1" onClick={()=>{
                        setTab(1)
                        dispatch(getlikedPosts())
                        }}>Like Poems</Nav.Link>
                </Nav.Item>
                </Nav>

                {/* <TabContent tab={tab} MyPost={MyPost} images={images} setCurrentId={setCurrentId} setSourceId={setSourceId} /> */}
                {(tab===0)?( !myPost.length ? <p className="notice">작성된 시가 없습니다.</p> : (
                          <div className="row">
                            {myPost.map((post) => (
                              <div className="col-md-3 col-6"  data-aos="fade-up" data-aos-duration="1000" style={{margin:'60px 0'}}>
                                <MyPost post={post} images={images} setCurrentId={setCurrentId} setSourceId={setSourceId}/>
                              </div>
                            ))}
                          </div>
                        ))
                :( !myPost.length ? <p className="notice">좋아하는 시가 없습니다.</p>: (
                        <div className="row">
                          {myPost.map((post) => (
                            <div className="col-md-3 col-6"  data-aos="fade-up" data-aos-duration="1000"  style={{margin:'60px 0'}}>
                              <MyPost post={post} images={images} setCurrentId={setCurrentId} setSourceId={setSourceId}/>
                            </div>
                          ))}
                        </div>
                      ))}
               </div>

                
        </div>
                
        )
}


export default Mypage;

