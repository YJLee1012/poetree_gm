import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';

import './MyPost.css';



import {getmyPosts,getlikedPosts,getPost} from '../../actions/posts'


const Post =({post, images, setCurrentId,setSourceId})=>{
    const dispatch= useDispatch();
    let history =useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <div className="card" >
            {/* 이미지 */}
          <img className="my_image" src={post.imageURL} 
        title={post.title} />
          
          {/* 클릭시 detail페이지로 이동 */}
          <div className="my_content">
          <div 
              onClick={()=>{
                setCurrentId(post.id);
                history.push('/detail');
            }}className="my_content-inner">
                {/* 사용자 표시 */}
                <div className="my_user">
                    <h6>{post.name}</h6>
                    <h6>{post.userEmail}</h6>
                </div>

                {/* 태그 */}
                <div className="my_tag">
                    <p>{post.hashtags}</p>
                </div>
                {/* 제목 title*/}
                <h3 className="my_title">{post.title}</h3>
          </div>
        </div>
        </div>
      );
};

export default Post;
