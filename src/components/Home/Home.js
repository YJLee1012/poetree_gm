import React, {useEffect, useState,useRef} from 'react';
import { useHistory ,useLocation } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';


import '../../App.css';
import './Home.css';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


import {getPosts,getHashPosts} from '../../actions/posts';
import {getImage,getImages} from '../../actions/images';
import {getImagePosts,getPrevImages} from '../../actions/imagePosts';


import Aos from "aos"
import "aos/dist/aos.css";

import poetree from '../../video/poetree_vid.mp4'
import arrow from '../../img/arrow.jpg'

const Home= ({setPostData,currentId,setCurrentId,event,setEvent, setTag,sourceId,setSourceId,index,setIndex,setImageURL}) =>{

  React.useEffect(() => {
    Aos.init({});
  }, [])

  let today = new Date();
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜

  if(month<10){
    month= '0'+month
  }
  if(date<10){
    date='0'+date
  }
  
  const homeSection = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  // const slideRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('profile'));
  
  let history =useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  // const img = useRef();
  
    useEffect(() => {
      dispatch(getImages());
      dispatch(getPrevImages());        
    }, [dispatch]);
  
    const getPrevImgs = useSelector((state)=>state.imageposts);
    const mainImgs = useSelector((state) => state.images);
    console.log('mainImgs출력',mainImgs);

    let prevImgs = [];
    for(let i=0;i<12;i++){
      prevImgs.push(getPrevImgs[i])
    }
    console.log('prevImgs출력 ',prevImgs);

    useEffect(()=>{
      setIndex(0)
      setSourceId(mainImgs[0]?.id)
      //첫번째이미지로 다시 되돌아옴
      setCurrentSlide(0)
    },[location,mainImgs])
      
    
    const images = [mainImgs[0]?.imageURL,mainImgs[1]?.imageURL,mainImgs[2]?.imageURL];
    const length = images.length;
    console.log(length)

    //수정페이지에서 그냥 나왔을경우 currentId,postData 초기화
    if(currentId){
      setCurrentId(null)
      setPostData({ title: '', content: '', hashtags: '' });
    }
    // 이벤트(삼행시)페이지에서 작성/수정 눌렀는데 그냥 나왔을때는 event값이 다시 null로되야해
    // home화면에서 event값이 있으면 null
    if(event){
      setEvent(null)
    }
    
      const nextSlide = () => {
        setCurrentSlide(currentSlide ===length-1 ? 0 : currentSlide+1);
        
        if(index>=length-1){
          setIndex(0)
          setSourceId(mainImgs[0]?.id)
        }else{
          setIndex(index+1)
          setSourceId(mainImgs[index+1]?.id)
        }
      }

      const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? length-1 : currentSlide-1);
        if(index<=0){
          setIndex(length-1)
          setSourceId(mainImgs[length-1]?.id)
        }else{
          setIndex(index-1)
          setSourceId(mainImgs[index-1]?.id)
        }
      }

      if(!Array.isArray(images) || images.length <=0){
        return null;
      }
    return(
      <div style={{overflow:'hidden'}}>
          <video autoPlay loop muted src={poetree} type='video/mp4' style={{zIndex:'999', width:'100vw', height:'100vh', cursor:'pointer',marginBottom:'300px'}}
            onClick={()=>{
              // 기기마다 다르지않을까..?
              window[`scrollTo`]({ top: homeSection.current.offsetTop, behavior: `smooth` })
            }}/>
          <section className="bgContainer" ref={homeSection}>
          <div className="background">
            <div className="bgContent">
              <div className="bg-text" data-aos="fade-right" data-aos-duration="3000">
                <h1>Plant your<br/> Poetree</h1>
                <div data-aos="fade-up" data-aos-duration="3000" className="line"></div>
                <div data-aos="fade-up" data-aos-duration="3000" className="circle"></div>
                <h3 data-aos="fade-up" data-aos-duration="3000" className="date">{month}.{date}</h3>
                <p>자신의 시집을 만들어 함께 공유하며 나눠보세요.<br/>
                  사진 속 오늘의 기분을 시로 작성해보세요.<br/>
                  그날의 시와 감성은<br/>
                  포에트리에서 간직하고 있습니다.<br/>
                  </p>
                <div className="button" onClick={()=>{history.push('/write')}}>시 작성하기</div>   
              </div>
              <div className="img-box">
              <section data-aos="fade-left" data-aos-duration="3000" className="img-slide" >
                <ArrowBackIosIcon className="left-arrow" onClick={prevSlide}/>
                <ArrowForwardIosIcon className="right-arrow" onClick={nextSlide}/>       
                {console.log('i',index)}
                {console.log('sourceId출력',sourceId)}
                {images.map((img,i)=> {
                  return(
                    <div className={i ===currentSlide ? 'slide active' : 'slide'} key={i}>
                      {i === currentSlide && (
                        <img src={img} key={i} />
                        )}
                    </div>
                  )
                })}
                <div className="button2" onClick={()=>{history.push('/write')}}>시 작성하기</div>   
                <p className="a">Today's Photo</p>
                <p className="sub">───  poetree  ───</p>
                <div className="img-text">
                  <p className="img-text1">PICK</p>
                  <p className="img-text2">What you want</p>
                  <p className="img-text3">AUTHOR</p>
                  <p className="img-text4">{user?.result.name}</p>
                </div>
              </section>
              </div>
              </div>
          </div>
          </section>

        {/* 지난 이미지들 */}
        <section className="prev_images" data-aos="fade-left" data-aos-duration="3000">
          <div className="prev_img_flex">
            <div className="prev_text" >
              <h2>Photos by Date</h2>
              <p>오늘의, 그리고 지난 사진의 시들을<br/> 한눈에 만나보세요.</p>
            </div>
            <div className="container">
            <div className="row">
              {(prevImgs)?(prevImgs.map((img)=>(
                // col-xs-6(모바일 한줄에 2개씩) 적용안됨,, why?
                <div className="col-4 col-sm-2"  style={{margin:'60px 0 15px 0'}}>
                  <div className="card_prev img_box">
                    <img src={img?.imageURL}/>
                    <div className="more">
                      <div className="more_inner" 
                        onClick={()=>{
                          setSourceId(img.id);
                          setImageURL(img.imageURL);
                          history.push('/imagePoets');
                        }}>
                        <p>{img?.uploadDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )))
              :(<></>)}
            </div>
            </div>
            <img className="arrow" src={arrow}
              onClick={()=>{
                history.push('/preImages')
            }}/>
          </div>
        </section>

        {/* 키워드 */}
          <section className="keywords" 
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="2000"
            data-aos-easing="ease-in-out">
            <h2>Keywords</h2>
            <p>#키워드를 통해 더 다양한 시들을 살펴보세요.</p>
            <div className="keywords-list">
              
              <div className="keyword-item"  onClick={()=>{
                setTag('계절'); 
                history.push('/hashtag');
                }} ><div className="text">계절</div></div>
              <div className="keyword-item"   onClick={()=>{
                setTag('낮'); 
                history.push('/hashtag');
                }}><div className="text">낮</div></div>
              <div className="keyword-item" onClick={()=>{
                setTag('밤'); 
                history.push('/hashtag');
                }}  ><div className="text">밤</div></div>
              <div className="keyword-item" onClick={()=>{
                setTag('노을'); 
                history.push('/hashtag');
                }} ><div className="text">노을</div></div>
              <div className="keyword-item"  onClick={()=>{
                setTag('꽃'); 
                history.push('/hashtag');
                }} ><div className="text">꽃</div></div>

              <div className="keyword-item"   onClick={()=>{
                setTag('책'); 
                history.push('/hashtag');
                }}><div className="text">책</div></div>
              <div className="keyword-item"   onClick={()=>{
                setTag('빌딩'); 
                history.push('/hashtag');
                }}><div className="text">빌딩</div></div>
              <div className="keyword-item"  onClick={()=>{
                setTag('하늘'); 
                history.push('/hashtag');
                }} ><div className="text">하늘</div></div>
              <div className="keyword-item" onClick={()=>{
                setTag('바다'); 
                history.push('/hashtag');
                }} ><div className="text">바다</div></div>
              <div className="keyword-item" onClick={()=>{
                setTag('음식'); 
                history.push('/hashtag');
                }} ><div className="text">음식</div></div>
            </div>
          </section>
          
      </div>
      );
}
  
  export default Home;