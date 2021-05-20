import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getImagePosts } from '../../actions/imagePosts';

import ImagePost from './ImagePost'

const ImagePoets = ({sourceId,setCurrentId,imageURL}) => {
    const dispatch = useDispatch();

    const [type,setType]= useState('');

    console.log('sourceId값',sourceId);
    useEffect(()=>{
        dispatch(getImagePosts(sourceId,type))
    },[]);

    const imagePosts = useSelector((state)=>state.imageposts);
    // console.log('imagePosts출력',imagePosts);
    return(
        <div className="imagePoets" style={{overflow:'hidden'}}>
        <div className="bg_color" style={{
            width:'100vw',
            height:'25vh',
            backgroundColor:'#f4f4f4',
            marginBottom: '120px'
            }}>
            <img src={imageURL} style={{width:'180px',height:'180px',objectFit:'cover',borderRadius:'50px',margin:'120px auto',opacity:'80%'}}/>
        </div>
            <div className="container">
            <div className="row">
                {(imagePosts)?(imagePosts.map((post)=>(
                    <div className="col-md-4 col-6"  data-aos="fade-up" data-aos-duration="1000" style={{margin:'60px 0'}}>
                    <ImagePost post={post} setCurrentId={setCurrentId} sourceId={sourceId} type={type} ></ImagePost>
                </div>
                )))
                :(<p style={{margin: '100px auto'}}>해당 이미지의 시가 없습니다</p>)}
            </div>
            </div>
        </div>
    )
}
export default ImagePoets;