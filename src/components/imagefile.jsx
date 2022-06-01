import React from "react";
import { useState } from "react";
function Image() {
    const [image, setImage] = useState({});
    const [url, setUrl] = useState("");
    const getImgURl = () => {
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
                setUrl(data.url);

            });
    };
    const fileChangeHandler = (e) => {
        
        setImage(e.target.files[0]);
        
        // console.log(formdata.values(), 'formdata');
        // setFormdata(formdata);
    };
    return (
        <div>
            <div>
                <input type="file" onChange={fileChangeHandler} />
                <button onClick={getImgURl}>Upload</button>
            </div>
            <div>
                <h1>Uploaded image will be displayed here</h1>
                <img src={url} />
            </div>
        </div>
    )
}
export default Image;