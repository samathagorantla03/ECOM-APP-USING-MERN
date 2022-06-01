import React from 'react'
import {useDispatch} from 'react-redux'
import { addUser } from '../reducers/loginslice';
function Register(){
    const dispatch=useDispatch();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        //console.log(e.target.username.value)
        let newUser={
            username:e.target.username.value,
            pswd:e.target.pswd.value,
            usertype:e.target.usertype.value,
        }
        console.log(newUser);
        dispatch(addUser(newUser));
    }
    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder='Enter the username' name='username' />
                <input type="password" name='pswd' />
                <input type="hidden" name='usertype' value="user"/>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}
export default Register