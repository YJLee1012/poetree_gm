import React, { useState, useEffect, useRef } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import { getImages } from '../../actions/images';
import Posts from '../Posts/Posts/Posts.js';
import './List.css'
const List = ({currentId,setCurrentId,setSourceId}) => {

  const dispatch = useDispatch();

  const [type,setType]= useState('');

  useEffect(() => {
    dispatch(getImages());
    dispatch(getPosts(type));
    // dispatch(getPosts());
  }, [type]);

  return (
    <Grow in>
      <Container maxWidth = "lg" style={{margin: '100px auto'}}>
        <ul className="list_order_type">
          <li onClick={(e)=>{
            setType('')
          }}><a href="#" className="type">최신순</a></li>
          <li onClick={()=>{setType('order_likes')}}><a href="#" className="type">좋아요순</a></li>
          <li onClick={()=>{setType('order_views')}}><a href="#" className="type">조회수순</a></li>
        </ul>
        {console.log('type',type)}
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12}>
              <Posts setCurrentId={setCurrentId} setSourceId={setSourceId} type={type}/>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid> */}
          </Grid>
      </Container>
    </Grow>
  );
};

export default List;