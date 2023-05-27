import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../login.css'
const Login = () => {
 const navigate = useNavigate();
 const [userEmail , setUserEmail] = useState('');
 const [userPassword , setUserPassword] = useState('');
 const [errorStatus , setErrorStatus] = useState(false);
//  demo@coralmango.com
// demo123

const userCredential = {
  email :  "demo@coralmango.com",
  password : "demo123" 
}

const handleLoginForm = (e) => {
   e.preventDefault();
   if(userEmail === userCredential.email && userPassword === userCredential.password){
    setErrorStatus(false);
    // alert("success");
    navigate('/users');
   }else{
    setErrorStatus(true);
   }
 }
  return (
    <div className="form-container">
      <div className='login-form'>
        <h3>Login</h3>
        <form autoComplete='off' onSubmit={(e) => handleLoginForm(e)}>
          <input type="text" placeholder='Email' onChange={(e) => setUserEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e) => setUserPassword(e.target.value)}/>
          <button type='submit'>Submit</button>
        </form>
          {errorStatus ? <small className='error'>Invalid Credentials!</small> : ""}
      </div>
    </div>
  )
}

export default Login