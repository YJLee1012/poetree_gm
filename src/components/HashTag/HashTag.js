import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getHashPosts } from '../../actions/posts';

import HashPost from './HashPost'

const HashTag = ({tag,setCurrentId,setSourceId}) => {
    const dispatch = useDispatch();
    console.log('tag값',tag);
    useEffect(()=>{
        // dispatch(getImages())
        dispatch(getHashPosts(tag))
    },[]);
    const images = useSelector((state)=>state.images);
    const hashPosts = useSelector((state)=>state.hashmyposts);
    console.log('hashPosts출력',hashPosts);
    return(
        <div className="container" style={{margin: '100px auto'}}>
            <h3 style={{ fontFamily: '"Libre Baskerville", "Noto Sans KR", serif'}}>#{tag}</h3>
            <div className="row">
                {(hashPosts)?(hashPosts.map((post)=>(
                    <div className="col-md-4 col-6"  data-aos="fade-up" data-aos-duration="1000" style={{margin:'60px 0'}}>
                    <HashPost tag={tag} post={post} images={images} setCurrentId={setCurrentId} setSourceId={setSourceId} ></HashPost>
                </div>
                )))
                :(<></>)}
            </div>
        </div>
    )
}
export default HashTag;