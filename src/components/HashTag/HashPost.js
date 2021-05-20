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

// import 액션
import { likePost, deletePost, getPost,getLikers} from '../../actions/posts';
import { getHashPosts } from '../../actions/posts';


const HashPost =({tag,post, images, setCurrentId,setSourceId})=>{
    const dispatch= useDispatch();
    let history =useHistory()

    const user = JSON.parse(localStorage.getItem('profile'));
    
    const Likes = () => {
      if (post?.likers?.length > 0) {
        return post?.likers.find((like) => like?.name=== (user?.result?.name))
          ? (
            <><FavoriteIcon fontSize="small" color="secondary" />&nbsp;{post.likers.length > 2 ? `You and ${post.likers.length - 1} others` : `${post.likers.length} like${post.likers.length > 1 ? 's' : ''}` }</>
          ) : (
            <><FavoriteBorderIcon fontSize="small" color="secondary" />&nbsp;{post.likers.length} {post.likers.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
      return <><FavoriteBorderIcon fontSize="small" color="secondary" />&nbsp;Like</>;
    };
  
    return (
        <div className="card">

          <img className="image" src={post.imageURL} title={post.title} />
          
          {/* 사용자, 시간 ago 표시 */}
          <div className="user-time">
            <h6>{post.name}</h6>
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
            <p>{post.hashtags}</p>
          </div>
          {/* 제목 title*/}
          <h3 className="title">{post.title}</h3>
          {/* like, delete 아이콘 버튼 */}
          <CardActions className="cardActions">
            <Button size="small" color="primary" disabled={!user?.result} onClick={() =>
            { dispatch(likePost(post.id)) 
              dispatch(getHashPosts(tag))}}>
                <Likes />
            </Button>
            {/* {(user?.result?.email === post?.UserEmail)&& (
              <Button size="small" color="primary" onClick={() => dispatch(deletePost(post.id))}><DeleteIcon fontSize="small" color="action" /> Delete</Button>
              )} */}
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

export default HashPost;
