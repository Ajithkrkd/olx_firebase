import React, {useState} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import {auth} from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth'

function Login() {
const [email,setEmail] =useState('');
const [password,setPassword]=useState('')
const navigate = useNavigate()
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/')
  } catch (error) {
    console.error(error);
    alert("Invalid email or password. Please try again.");
  }
};

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
          onChange={(e)=>{setEmail(e.target.value)}}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          onChange={(e)=>{setPassword(e.target.value)}}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <button className='btn mt-2' onClick={()=>{navigate('/signup')}}>Signup</button >
      </div>
    </div>
  );
}

export default Login;
