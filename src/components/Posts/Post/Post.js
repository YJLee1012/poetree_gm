import React, {useEffect} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';

import './Post.css';

import img1 from '../../../img/1.jpg';


// import 액션
import { likePost, deletePost, getPost,getPosts} from '../../../actions/posts';
import {getImage,getImages} from '../../../actions/images';


const Post =({post, setCurrentId,type})=>{
    const dispatch= useDispatch();
    let history =useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));

    // console.log('post.title',post.title)
    // console.log('id값',post.id)
    
    const Likes = () => {
      if (post?.likers?.length > 0) {
        return post.likers.find((like) => like?.name=== (user?.result?.name))
          ? (
            <><FavoriteIcon fontSize="small" color="secondary" />&nbsp;{post.likers.length > 2 ? `You and ${post.likers.length - 1} others` : `${post.likers.length} like${post.likers.length > 1 ? 's' : ''}` }</>
          ) : (
            <><FavoriteBorderIcon fontSize="small" color="secondary" />&nbsp;{post.likers.length} {post.likers.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
      return <><FavoriteBorderIcon fontSize="small" color="secondary" />&nbsp;Like</>;
    };
    // const Likes = () =>{
    //   if(post.likes>0 && post.likers!==null){
    //     return post.likers.find(liker => liker?.name === (user?.result.name) 
    //     ?(
    //       <><FavoriteIcon fontSize="small" color="secondary" />&nbsp;{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</>
    //     ):(
    //       <><FavoriteBorderIcon fontSize="small" color="secondary" />&nbsp;{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</>)
    //     )
    //   }
    //       return <><FavoriteBorderIcon fontSize="small" color="secondary" />&nbsp;Like</>;
    // };
  
    return (
        <div className="post_card">
          <img className="image" src={post.imageURL} 
        title={post.title} />
       
          
          {/* 사용자, 시간 ago 표시 */}
          <div className="user-time">
            <h6>{post.name}</h6>
            <p>{moment(post.createdAt).fromNow()}</p>
          </div>
          {/* 수정 아이콘 버튼 */}
          {/* 수정아이콘 creator가 currently logged in user 일때만 보여주도록 함. */}
          {(user?.result?.email === post.UserEmail)&& (
            <div className="edit">
                <Button color="primary" size="small" 
                  onClick={() => {
                    setCurrentId(post.id);
                    // setSourceId(post.SourceId);
                    //배열아닌 객체로 전달되어야 수정가능
                    dispatch(getPost(post.id));
                    history.push('/write');}}><EditIcon fontSize="default" />
                </Button>
            </div>
          )}
          {/* 태그 */}
          <div className="tag">
            {/* {post.hashtags.map((tag)=>`#${tag} `)} */}
            <p className="post_views">조회수 {post.views}</p>
            <p>{post.hashtags}</p>
          </div>
          {/* 조회수 */}
          {/* 제목 title*/}
          <h3 className="title">{post.title}</h3>

          {/* 좋아요like, 삭제delete 아이콘 버튼 */}
          <CardActions className="cardActions">
            <Button size="small" color="primary" disabled={!user?.result} onClick={() =>
            { dispatch(likePost(post.id)) 
              // dispatch(getLikers(post.id))
              dispatch(getPosts(type))
            }}>
                <Likes />
            </Button>
            {(user?.result?.email === post?.UserEmail)&& (
              <Button size="small" color="primary" onClick={() => dispatch(deletePost(post.id))}><DeleteIcon fontSize="small" color="action" /> Delete</Button>
              )}
          </CardActions>
          <div className="content">
            <div 
                onClick={()=>{
                  setCurrentId(post.id);
                  // setSourceId(post.SourceId);
                  history.push('/detail');
              }}className="content-inner">
                {/* 내용 message */}
                  <p>{post.content?.split('\n').map((line) =>{
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })}</p>
            </div>
          </div>
        </div>
      );
};

export default Post;
