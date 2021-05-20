import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { getPrevImages } from '../../actions/imagePosts';

import '../Home/Home.css'

const PreImgs = ({setSourceId,setImageURL}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(getPrevImages())
    },[dispatch]);

    const preImgs = useSelector((state)=>state.imageposts);
    // console.log('preImgs출력',preImgs);
    return(
        <div className="preImgs">
            <h3 style={{ fontFamily: '"Libre Baskerville", "Noto Sans KR", serif'}}>Photos by date</h3>
            <p style={{ fontFamily: '"Libre Baskerville", "Noto Sans KR", serif'}}>보고싶은 사진을 클릭해보세요.</p>
            <div className="row" data-aos="fade-up" data-aos-duration="1000">
                {(preImgs)?(preImgs.map((img)=>(
                    <div className="col-md-2 col-4" style={{margin:'60px 0'}}>
                    <div className="card_prev">
                        <img src={img.imageURL} style={{height:'100%', objectFit:'cover'}}/>
                        <div className="content">
                            <div className="content-inner"
                                onClick={()=>{
                                    setSourceId(img.id);
                                    setImageURL(img.imageURL);
                                    history.push('/imagePoets');
                                }}>
                                {/* 날짜 */}
                                <h3>{img.uploadDate}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                )))
                :(<p>해당 사진의 작성된 시가 없습니다</p>)}
            </div>
        </div>
    )
}
export default PreImgs;