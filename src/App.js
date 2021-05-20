import React, {useState,useEffect} from 'react';
import { useHistory ,useParams,useLocation } from 'react-router-dom';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';

// redux를 위한 import
import {useDispatch,useSelector} from 'react-redux';

import Mypage from './components/Mypage/Mypage.js'
import Auth from './components/Auth/Auth.js'
import List from './components/List/List.js'
import Detail from './components/List/Detail'

import Form from './components/Form/Form'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './components/Home/Home'
import About from './components/About/About'
import Admin from './components/Admin/Admin'
import HashTag from './components/HashTag/HashTag'
import Event from './components/Event/Event'



import Scroll from './components/Scroll/Scroll'
import ScrollToTop from './components/ScrollToTop'

import {getImages} from './actions/images'
import {getPosts} from './actions/posts'
import ImagePoets from './components/imagePoets/ImagePoets';
import PreImgs from './components/imagePoets/PreImgs';

function App() {

  const [postData, setPostData] = useState({
        title: '', content: '', hashtags: ''
    });
  // id
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();

  const location = useLocation();

  const [isOpen,setIsOpen] = useState(false);

  const [tag,setTag]= useState('');

  const [sourceId,setSourceId] = useState(1);

  const [index,setIndex] = useState(0);

  const [imageURL,setImageURL] = useState('');

  const [event, setEvent] = useState('');

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  // useEffect(()=>{
  //   dispatch(getImages());
  // },[])
  // const mainImgs = useSelector((state) => state.images);
  // console.log('mainImgs출력',mainImgs);


  return (
    <div className="App">

    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} toggle={toggle}/>
    <Navbar toggle={toggle}/>

    {/* scroll값 설정 */}
    <Scroll showBelow={30} />
    


    <Switch>
    {/* 메인페이지 */}
    <Route exact path="/">
      <ScrollToTop/>
      <Home setPostData={setPostData} currentId={currentId} setCurrentId={setCurrentId} event={event} setEvent={setEvent} setTag={setTag} sourceId={sourceId} setSourceId={setSourceId} index={index} setIndex={setIndex} setImageURL={setImageURL}></Home>
  </Route>
    
    {/* 이미지게시물페이지 */}
    <Route path="/imagePoets">
      <ScrollToTop/>
      <ImagePoets sourceId={sourceId} setCurrentId={setCurrentId} imageURL={imageURL}></ImagePoets>
  </Route>

    {/* get preImgs 페이지 */}
    <Route path="/preImages">
      <ScrollToTop/>
      <PreImgs setSourceId={setSourceId} setImageURL={setImageURL}></PreImgs>
  </Route>

    {/* 해시태그게시물페이지 */}
    <Route path="/hashtag">
      <ScrollToTop/>
      <HashTag tag={tag} setCurrentId={setCurrentId} setSourceId={setSourceId}></HashTag>
  </Route>

  {/* 시작성,수정 페이지 */}
    <Route path="/write">
      <Form event={event} setEvent={setEvent} postData={postData} setPostData={setPostData} currentId={currentId} setCurrentId={setCurrentId} sourceId={sourceId} setSourceId={setSourceId} index={index}></Form>
    </Route> 


  {/* 시 리스트페이지 */}
    <Route path="/list">
        <ScrollToTop/>
        <List currentId={currentId} setCurrentId={setCurrentId} setSourceId={setSourceId}></List>
    </Route>

  {/* event페이지 */}
    <Route path="/event">
        <ScrollToTop/>
        <Event event={event} setEvent={setEvent} setCurrentId={setCurrentId} setSourceId={setSourceId} setIndex={setIndex} setPostData={setPostData} currentId={currentId} sourceId={sourceId}></Event>
    </Route>


    <Route path="/detail">
      <ScrollToTop/>
      <Detail currentId={currentId} setCurrentId={setCurrentId} sourceId={sourceId} event={event}></Detail>
      </Route>

{/* 로그인페이지 */}
     <Route path="/login">
      <Auth></Auth>
    </Route> 


{/* 마이페이지 */}
    <Route path="/mypage">
      <ScrollToTop/>
     <Mypage setCurrentId={setCurrentId} setSourceId={setSourceId}></Mypage>
    </Route> 

{/* 소개페이지 */}
    <Route path ="/about">
      <ScrollToTop/>
      <About></About>
    </Route>
    
    {/* 어드민페이지 */}
    <Route path ="/admin">
      <Admin></Admin>
    </Route>

    </Switch>

    </div>
  );
}
export default App;