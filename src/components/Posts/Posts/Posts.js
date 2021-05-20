import React, {useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';

import Post from '../Post/Post';

import Aos from "aos"
import "aos/dist/aos.css";

import '../../List/List.css'

const Posts = ({ setCurrentId, setSourceId,type }) => {
  
  const posts = useSelector((state) => state.posts);
  console.log('posts출력',posts);

  React.useEffect(() => {
    Aos.init({});
  }, [])



  return (
    !posts.length ? <CircularProgress /> : (
      <div className="row">
        {posts.map((post) => (
          //하나의 post
          <div className="col-md-3 col-12 posts_post"  data-aos="fade-up" data-aos-duration="1000">
            <Post post={post} setCurrentId={setCurrentId} type={type}/>
          </div>
        ))}
      </div>
    )
  );
};

export default Posts;