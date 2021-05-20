import React, {useEffect, useState,useRef} from 'react';
import { useHistory ,useLocation } from 'react-router-dom';
import { Button,Jumbotron } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';

import img1 from '../../img/1.jpg';
import img2 from '../../img/2.jpg';
import img3 from '../../img/3.jpg';
import img4 from '../../img/4.jpg';
import tag from '../../img/tag.PNG';

import imgPen from '../../img/pen.png';
import bg from '../../img/pen.jpg';

import './About.css'

import Aos from "aos"
import "aos/dist/aos.css";

const About= ({currentId}) =>{
    React.useEffect(() => {
      Aos.init({});
    }, [])
    let history =useHistory();
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts);
    return(
        <div className="about">
          <img className="bg" src={bg}/>
        <h1 data-aos="zoom-in" data-aos-duration="1000">About Poetree</h1>
        <section className="about_poetree">
        <div className="container about0">
        <div   style={{margin:'100px 0'}} data-aos="fade-up" data-aos-duration="1000"> 
          {/* <img className="col-md-7" src={imgB}></img> */}
          <div className="about_text">
            <div className="Poetree">Poetree란?</div>
            <div className="line1" ></div>
            <p className="explain"style={{fontFamily:'Nanum Myeongjo'}} data-aos="fade-up" data-aos-duration="2000">
              오늘의 사진을 보고 떠오르는 생각과 감정을 시로 작성해보세요.<br></br>
              일상과 함께 시를 기록해 여러분들만의 소중한 시집이 만들어집니다.<br/>
              그리고 언제 어디서나 여러분의 시집을 꺼내 보세요.<br/>
              </p>
          </div>
        </div>
      </div>
      </section>

      <section className="about_image">
        <div className="container about_flex">
          <div className="about_img_text">
            <h2>매일 올라오는 사진들</h2>
            <p>매일 다르게 올라오는 사진을 보고<br/>떠오르는 새로운 영감들</p>
          </div>
          <div className="about_imgs">
              <img className="img1" src={img1}/>
              <img className="img2" src={img2}/>
              <img className="img3" src={img3}/>
              <img className="img4" src={img4}/>
          </div>
        </div>
      </section>

      <section className="about_tag">
        <div className="container about_tag_flex">
          <div className="about_tag_img">
              <img className="img_tag" src={tag}/>
          </div>
          <div className="about_tag_text">
            <h2>#해시태그로 보는 테마별 시</h2>
            <p>태그를 눌러보면 <br/>테마별 시들을 한눈에 확인해 볼 수 있습니다</p>
          </div>
        </div>
      </section>
      
      <div className="main-banner" data-aos="fade-up" data-aos-duration="1000">
      <img style={{ width: '150px', marginLeft:'-20px'} } src={imgPen}></img>
      <p>poetree에서는 다양한 시선으로 생각하고 바라볼 수 있습니다.<br/>
        지금 바로 많은 사람들이 작성한 시들을 둘러보세요.<br/></p>
        <Button variant="outline-secondary" onClick={()=>history.push('/list')}>바로가기</Button>
        </div>

      {/* <div className="container poet" data-aos="fade-up" data-aos-duration="1000">
        <div className="row" style={{margin:'130px 0'}}>
          <div className="col-md-7"style={{marginTop:'100px' , fontFamily: 'Nanum Myeongjo'}}>
            <h4 style={{marginBottom:'60px' }}>흔들리며 피는 꽃</h4>
            <p style={{textAlign:'right' , padding:'20px 50px'}}>도종환</p>
            <p >흔들리지 않고 피는 꽃이 어디 있으랴<br></br>
              이 세상 그 어떤 아름다운 꽃들도<br></br>
              다 흔들리면서 피었나니<br></br>
              흔들리면서 줄기를 곧게 세웠나니<br></br>
              흔들리지 않고 가는 사람이 어디 있으랴<br></br>
              <br></br>
              젖지않고 피는 꽃이 어디 있으랴<br></br>
              이 세상 그 어떤 빛나는 꽃들도<br></br>
              다 젖으며 젖으며 피었나니<br></br>
              바람과 비에 젖으며 꽃잎 따뜻하게 피웠나니<br></br>
              젖지 않고 가는 삶이 어디 있으랴</p>
          </div>
          <img className="col-md-5" src={}></img>
        </div>
      </div> */}

      </div>

    );
}
export default About;