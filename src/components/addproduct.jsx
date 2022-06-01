import React ,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { addproduct } from '../reducers/productslice';
import { useNavigate} from 'react-router-dom';

function Addproduct(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [image, setImage] = useState({});
    const getImgURl = (e) => {
        
        const formdata = new FormData();
        formdata.append('file', image);
        formdata.append('upload_preset', 'docs_upload_example_us_preset');
        fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
            method: 'POST',
            body: formdata,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data, 'data');
                let newproduct={
                    name:e.target.name.value,
                    price:e.target.price.value,
                    seller:e.target.seller.value,
                    Description:e.target.Description.value,
                    src:data.url,
                }
                dispatch(addproduct(newproduct))
                navigate('/');

            });
    };
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        getImgURl(e);   
       
    }
    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name='name' /><br />
                <input type="text" name='price' /><br />
                <input type="text" name='seller'/><br />
                <input type="textarea" name='Description'/><br />
                <input type="file" onChange={(e)=> setImage(e.target.files[0])} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default Addproduct