import React, {useState} from 'react'
import axios from 'axios'
import ImageUploader from 'react-images-upload';
import { useDispatch,useSelector } from 'react-redux';

import {imageUpload} from '../../actions/images';


const Admin = () => {
    const dispatch = useDispatch();
    const image = useSelector((state)=>state.images);
    const [img,setImg] = useState([]);
    const [uploadDate,setUploadDate] = useState('');
    const [description,setDescription] = useState('');

    const onChange = (picture) =>{
        setImg(img.concat(picture))
    } 
    const uploadImages = () => {
        console.log('출력:',img)
        img.map((image) => {
            const res={image,uploadDate};
            console.log(res);
            let data = new FormData();
            data.append('image',image);
            data.append('uploadDate',uploadDate);
            data.append('description',description);
            console.log('uploadDate출력',uploadDate);
            dispatch(imageUpload(data));
        })
    }
    
    return(
        <section>
                 <ImageUploader
                     withIcon={true}
                     withPreview={true}
                     buttonText='Choose images'
                     onChange={onChange}
                     imgExtension={['.jpg', '.gif', '.png']}
                     maxFileSize={5242880}
                 />
                 <input type="text" placeholder="날짜입력" onChange={(e)=>setUploadDate(e.target.value)}></input>
                 <input type="text" placeholder="삼행시" onChange={(e)=>setDescription(e.target.value)}></input>
                 <button onClick={uploadImages}>Upload Images</button>
        </section>
    )
}
export default Admin;