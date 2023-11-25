import React, { useState } from "react";
import Swall from "sweetalert2";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import {useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { addDoc, collection} from 'firebase/firestore'


  export default function Signup() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const showAlert = (errorMessage) => {
      Swall.fire({
        title: "Oops !!",
        icon: "error",
        text: errorMessage,
        confirmButtonText: "OK",
      });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      if (userName.length < 5) {
        return showAlert("Username must contain at least 5 letters");
      } else if (phone.length !== 10) {
        return showAlert("Phone number must contain exactly 10 numbers");
      } else if (password.length <= 6) {
        return showAlert("Password must be greater than 6 characters");
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(userCredential.user, { displayName: userName });
  
          // Add user data to Firestore
          const userCollection = collection(db, 'users');
          const userDocument = {
            id: userCredential.user.uid,
            username: userName,
            phone: phone,
          };
  
          await addDoc(userCollection, userDocument);
  
          // Navigate to login after successful registration
          navigate('/login');
        } catch (error) {
          console.error(error);
          showAlert('Email already in use');
        }
      }
    };
  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button className="btn" onClick={()=>{navigate('/signup')}}>Signup</button>
        </form>
        <button className="btn mt-3" onClick={()=>{navigate('/login')}}>Login</button>
      </div>
    </div>
  );
}
