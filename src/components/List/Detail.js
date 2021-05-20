import React, {useState, useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { useHistory,useLocation} from 'react-router-dom';
import { Button } from '@material-ui/core/';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Post from '../Posts/Post/Post.js';
import Posts from '../Posts/Posts/Posts.js';
import { getPost, deletePost ,likePost} from '../../actions/posts';
import { createComment,updateComment,deleteComment } from '../../actions/comment';

import './Detail.css'

import note from '../../img/note1.jpg'
import img1 from '../../img/1.jpg'

const Detail = ({currentId, setCurrentId,sourceId,event}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  const mainImgs = useSelector((state)=>state.images);
  const postImg = mainImgs[sourceId-1]?.imageURL;
  //or detail post.Source-1써도 ok
  console.log('sourceId',sourceId)

  const [commentIn,setCommentIn] = useState('');

  const data = { comment: commentIn};
  
  const [commentId,setCommentId] = useState();

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

  // 각 게시물 불러오기
  useEffect(() => {
    dispatch(getPost(currentId));
    //다시 시작성할때 currentId값 저장되지 않도록 하기 위해서
    setCurrentId(null);
  }, [dispatch]);

  const post = useSelector((state) => state.posts);
  console.log('Detail, post출력',post);

  const comments = useSelector((state)=>state.comments);
  // console.log('comments출력 ', comments)

  const clickEdit=(e)=>{
    setCurrentId(post.id);
    // setSourceId(post.SourceId);
    console.log(currentId);
    history.push('/write');
    // clear();
  }
  // const clear=()=>{
  //     setCurrentId(null);
  //   }
    
    // 댓글작성 확인버튼 눌렀을 때
    const commentBtn=(e)=>{
      e.preventDefault();
    
      if(user&&commentId){
        dispatch(updateComment(post.id,commentId,data))
        clear()
      }else if(user&&!commentId){
        dispatch(createComment(post.id, data))
        clear()
      }else{
        alert('로그인이 필요한 서비스입니다.')
        history.push('/login')
      }
      //댓글 확인눌렀을 때 바로 댓글 표시되도록 하기 위해
      dispatch(getPost(post.id))
    
    }

    const clear=()=>{
      setCommentId(null);
      setCommentIn('');
  }

   
  return (
    <div className="detail">
        <div 
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
              className="note1">
      <div 
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          className="publish">
          <div className="write">
              <h3 className="title-input">{post.title}</h3>
              <p className="author">{post.name}</p>
              <p className="content-input" >{post.content?.split('\n').map((line) =>{
                   return (
                    <span>
                      {line}
                      <br />
                    </span>
                  );
                })}</p>
              <p className="hashtags">{post.hashtags}</p>
              {/* <p className="views">조회수 {post.views}</p> */}
              <Button size="small" disabled={!user?.result} onClick={() =>
            { dispatch(likePost(post.id)) 
              dispatch(getPost(post.id))}}>
                <Likes />
            </Button>
          </div>
          <div className="poet-img">
            <img src={post.imageURL}/>
          </div>
      </div>
      </div>
      {(user?.result?.email === post.UserEmail)&&(
        <div>
          <Button style={{margin:'16px'}} variant="outlined" 
            onClick={clickEdit}>수정하기</Button>
          <Button style={{margin:'16px'}} variant="outlined" 
            onClick={()=>{
            dispatch(deletePost(post.id))
            alert('삭제되었습니다.');
            (event)?(history.push('event')):(history.push('list'))
          }}>삭제하기</Button>
        </div>
      )}

    {/* 댓글 comments */}
    <section className="comment_section">
      <h4 className="comment_title">댓글</h4>
      {/* 댓글 작성ui */}
      <Comment commentId={commentId} user={user} commentIn={commentIn} setCommentIn={setCommentIn} commentBtn={commentBtn}></Comment> 
      
        {console.log('commentIn입력:',commentIn)}

      {/* 댓글 수정, 삭제 ui */}
      <div className="comments">
          {
            comments?.map((comment)=>
              (
                <div className="comment_boxs">
                {/* commentId와 게시물 id가 맞는 게시물만 수정으로 바뀌도록 */}
                {commentId===comment?.id ? 
                  <Comment commentId={commentId} user={user} commentIn={commentIn} setCommentIn={setCommentIn} commentBtn={commentBtn}></Comment> 
                  : <CommentList user={user} comment={comment}></CommentList>}
          
                  {(user?.result.email === comment?.commenter) && (
                <div className="edit_delete">
                  <p onClick={()=>{
                    setCommentId(comment?.id)
                    setCommentIn(comment?.comment)                    
                  }}>수정</p>
                  <p onClick={()=>{dispatch(deleteComment(post.id, comment?.id))}}>삭제</p>
                </div>
                  )}
              </div>
              )
            )
          }
      </div>
    </section>
    </div>
  );
};


//댓글작성창(작성/수정할 때)
function Comment({commentId,user,commentIn,setCommentIn,commentBtn}){
  return(
    <div className="box">
      {console.log('업데이트commentId출력:',commentId)}
      <div className="comment_box">
            <img src={user?.result.image} style={{width:'42px' ,height:'42px', borderRadius:'50px'}}/>
            <textarea className="comment_write" 
              placeholder="댓글을 작성해주세요."
              value={commentIn}
              onChange={(e)=>setCommentIn(e.target.value)}
            ></textarea>
      </div>
            <Button variant="outline-secondary"
              onClick={commentBtn}>확인</Button>
    </div>
  )
}

//각 댓글 리스트들(수정하지 않을때)
function CommentList({user,comment}){
  return(
    <div className="comment_boxss">
        <img src={comment?.image} style={{width:'42px' ,height:'42px', borderRadius:'50px'}}/>
        <div className="comment_item">
        <p className="comment_userName">{comment?.commenterName}</p>
        <p className="comment">{comment?.comment}</p>
      </div>
    </div>
  )
}



export default Detail;