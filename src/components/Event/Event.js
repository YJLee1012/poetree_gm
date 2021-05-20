import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getEventImages } from '../../actions/images';
import { getEvents } from '../../actions/posts';
import { getImagePosts } from '../../actions/imagePosts';
import { useHistory } from 'react-router-dom';

import { Nav } from 'react-bootstrap';

import EventPost from './EventPost'
import './Event.css'
import eventBg from '../../img/eventbg.jpg'
import ImagePost from '../imagePoets/ImagePost'


const Event = ({event,setEvent,setCurrentId,setSourceId,setIndex,setPostData,currentId,sourceId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [type,setType]= useState('');

    let [tab,setTab] = useState(0);


    useEffect(()=>{
        dispatch(getEvents(type,'three_words'))
        dispatch(getEventImages('three_words'))
    },[type]);
    const eImages = useSelector((state)=>state.images);
    const eventPosts = useSelector((state)=>state.events);
    const imagePosts = useSelector((state)=>state.imageposts);

    console.log('event',eventPosts);

    // event 사진 담기
    const eventImgs = [eImages[1]?.imageURL,eImages[0]?.imageURL];

    //event수정페이지에서 그냥 나왔을경우 currentId,postData 초기화
    if(currentId){
        setCurrentId(null)
        setPostData({ title: '', content: '', hashtags: '' });
    }

    return(
        <div className="event">
            <img className="bg" src ={eventBg}/>
            {/* 사진 불러오기 */}
                <h1>event</h1>
            <div className="container">
                    <p style={{margin:'50px', lineHeight:'1.75'}}>삼행시를 적어보세요.<br/>추첨을 통해 선물이 증정됩니다!</p>
                <div className="event_images">
                    <div className="three_words">
                        <img src={eventImgs[0]}/>
                        <button onClick={()=>{
                            setIndex(1)
                            setSourceId(eImages[1].id)
                            // event , 삼행시 이벤트가 아닐시 다른것으로 변경가능
                            setEvent('three_words')
                            history.push('/write')
                        }}>작성하기</button>
                    </div>
                    <div className="three_words">
                        <img src={eventImgs[1]}/>
                        <button onClick={()=>{
                            setIndex(0)
                            setSourceId(eImages[0].id)
                            setEvent('three_words')
                            history.push('/write')
                        }}>작성하기</button>
                    </div>
                </div>

                {/* tab버튼들 만들어 */}
                <Nav className= "mt-5 tab" variant="tabs" defaultActiveKey="tab-0">
                <Nav.Item>
                <Nav.Link className="tab_name" eventKey="tab-0" onClick={()=>{
                        setTab(0)
                        dispatch(getEvents(type,'three_words'))
                        }}>All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link className="tab_name" eventKey="tab-1" onClick={()=>{
                        setTab(1)
                        dispatch(getImagePosts(eImages[1].id,type))
                        setSourceId(eImages[1].id)
                        }}>글로벌</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link className="tab_name" eventKey="tab-2" onClick={()=>{
                        setTab(2)
                        dispatch(getImagePosts(eImages[0].id,type))
                        setSourceId(eImages[0].id)
                        }}>미디어</Nav.Link>
                </Nav.Item>
                </Nav>

                {
                    (tab==0)&&(
                        ( !eventPosts.length ? <p className="notice">작성된 시가 없습니다.</p> : (
                            <div>
                                <TypeList setType={setType}/>
                                   <div className="row">
                                   {(eventPosts)?(eventPosts?.map((post)=>(
                                           <div className="col-md-3 col-6" data-aos="fade-up" data-aos-duration="1000" style={{margin:'60px 0'}}>
                                           <EventPost post={post} event={event} setCurrentId={setCurrentId} setSourceId={setSourceId} type={type} setEvent={setEvent}></EventPost>
                                    </div>
                                   ))):(<></>)}
                                   {/* {console.log(eventPosts)} */}
                                    </div>
                            </div>
                        )))}

                {    (tab==1)&&( 
                                 <div className="row">
                                     {(imagePosts.length)?(imagePosts.map((post)=>(
                                         <div className="col-md-3 col-6"  data-aos="fade-up" data-aos-duration="1000" style={{margin:'60px 0'}}>
                                         <ImagePost post={post} setCurrentId={setCurrentId} sourceId={sourceId} type={type} ></ImagePost>
                                     </div>
                                     )))
                                     :(<p className="notice">작성된 시가 없습니다</p>)}
                                 </div>
                             )
                                     }
                {    (tab==2)&&( 
                                 <div className="row">
                                     {(imagePosts.length)?(imagePosts.map((post)=>(
                                         <div className="col-md-3 col-6"  data-aos="fade-up" data-aos-duration="1000" style={{margin:'60px 0'}}>
                                         <ImagePost post={post} setCurrentId={setCurrentId} sourceId={sourceId} type={type} ></ImagePost>
                                     </div>
                                     )))
                                     :(<p className="notice">작성된 시가 없습니다</p>)}
                                 </div>
                             )
                                     }


            </div>
        </div>
    )
}

function TypeList({setType}){
    return(
        <ul className="order_type" >
            <li onClick={()=>{
                setType('')
            }} className="type">최신순</li>
            <li onClick={()=>{setType('order_likes')}} className="type">좋아요순</li>
        </ul>
    )
}
export default Event;