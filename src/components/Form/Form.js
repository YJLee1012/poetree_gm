import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, TextareaAutosize } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost,createEvent } from '../../actions/posts';
import { useHistory } from 'react-router-dom';

import note from '../../img/note1.jpg'
import './Form.css'
import img1 from '../../img/1.jpg'

import Aos from "aos"
import "aos/dist/aos.css";

const Form = ({event,setEvent,postData,setPostData,currentId, setCurrentId,images, sourceId,setSourceId, index }) => {

    React.useEffect(() => {
        Aos.init({});
      }, [])
      
    const dispatch = useDispatch();

    const [postImg,setPostImg] = useState();
    const mainImgs = useSelector((state)=>state.images)
    console.log('form mainImgs출력',mainImgs)
    
    
    if(!sourceId){
        //undefined면 sourceId 첫번째 이미지 id로
        setSourceId(mainImgs[0]?.id)
    }
    
    // 수정할때, currentId 게시물posts 가져오기 위해 redux 이용
    // 전체게시물(getPosts)에서 보여질때 수정방법
    // const post = useSelector((state) => (currentId ? state.posts.find((p) => p.id === currentId) : null));
    
    // 각게시물(getPost)에서 보여질때 수정방법
    const post = useSelector((state) => state.posts);
    console.log('Form-post값',post);
    
    console.log('currentId값', currentId);
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    //작성시에만 필요, 수정시에는 필요x
    console.log('sourceId받아온값',sourceId);

    // post(id 게시물)가 나타나거나 변할때 실행
    // 수정버튼 클릭시 currentId게시물 가져오기
    useEffect(() => {
        if (currentId) setPostData(post);
    }, [post])

    // //페이지 종료시, sourceId값 초기화
    // useEffect(() => {
    //     return(setSourceId(0))
    // }, [])



    // 제출버튼을 클릭하면 요청하는 함수
    const handleSubmit = (e) => {
        // 브라우저에서 새로고침 방지
        e.preventDefault();

        // currenId가 존재하면 updatePost
        if (currentId) {
            if(event){
                dispatch(updatePost(currentId, { ...postData, email: user?.result?.email }));
                clear();
                history.push('/event');
            }else{
                dispatch(updatePost(currentId, { ...postData, email: user?.result?.email }));
                clear();
                history.push('/list');
            }
        } else {
            // 사용자가 입력 한 모든 데이터와 함께 게시 요청 보내
            //postData(모든 데이터)를 전달 & 어떤 user인지도 함께
            //액션전달되면 바로 리듀서로 이동

            if(event==='three_words'){
                dispatch(createEvent({ ...postData, email: user?.result?.email },sourceId,event))
                clear()
                setEvent('')
                history.push('/event')
            }else{
                dispatch(createPost({ ...postData, email: user?.result?.email },sourceId))
                clear()
                history.push('/list')
            }
        }
    };

    if (!user?.result?.name) {
        return (
            <h5 style={{marginTop:'100px'}}>
                시 작성을 하려면 로그인이 필요합니다.
            </h5>
        );
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', content: '', hashtags: '' });
    }

    return (
        <div 
             data-aos="zoom-in" style={{overflow:'hidden'}}>
            <img className="note" src={note} />
            <form className="form" onSubmit={handleSubmit}>
                <div className="post-img">
                {/* //수정시에는 post.imageURL //처음 작성할때는 mainImgs에서 꺼내 사용*/}
                    <img src={(currentId)?(post.imageURL):(mainImgs[index].imageURL)} />
                    {/* <img src={mainImgs[index].imageURL} /> */}

                </div>
                <div className="post">
                    <h3>{currentId ? '시 수정하기' : '시 작성하기'}</h3>
                    <div className="post-write">
                        <TextField
                            className="title"
                            label="제목을 작성해주세요."
                            variant="outlined"
                            name="Title"

                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        />
                        <textarea
                            className="content_"
                            placeholder="시 내용을 작성해주세요."
                            variant="outlined"
                            name="content"

                            value={postData.content}
                            onChange={(e) => setPostData({ ...postData, content: e.target.value })}

                        />
                        <TextField
                            className="hashtags_write"
                            label="해시태그 (#을 붙여주세요)"
                            variant="outlined"
                            name="hashtags"

                            value={postData.hashtags}
                            // hashtag split 기준으로 나누기
                            onChange={(e) => setPostData({ ...postData, hashtags: e.target.value })}
                        />
                    </div>
                    <div className="btns">
                        <Button variant="outlined" size="small" onClick={clear} fullWidth>지우기</Button>
                        <Button className="submit" variant="contained" color="primary" size="large" type="submit" fullWidth>확인</Button>
                    </div>
                </div>
            </form>

        </div>
    );
}
export default Form