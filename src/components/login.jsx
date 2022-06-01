import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import { useEffect } from 'react';
import { loginAsync } from '../reducers/loginslice';
import {useNavigate} from 'react-router-dom'
function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        let temp;
        //console.log(e.target);
        if(e.target.username.value!='admin' && e.target.pswd.value!='admin'){
            temp='user';
        }
        else{
            temp='admin';
        }
        const user = {
            username: e.target.username.value,
            pswd: e.target.pswd.value,
            usertype:temp,

        };
        dispatch(loginAsync(user)); 
        navigate("/");
    }
    
    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <h1>Login Form</h1>
                <input type='text' placeholder='Enter the username' name='username'/><br />
                <input type='password' placeholder='Enter the password' name='pswd'/><br />
                <button >Sign In</button><br />
                <p>Don't have account? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    )
}
export default Login