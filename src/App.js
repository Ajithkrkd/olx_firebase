import React ,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Components/View/View';
import {UserContext} from '../src/store/UserContext'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/firebase/config'
import { PostContext, PostProvider } from './store/PostContext';

function App() {
  const {user,setUser} = useContext(UserContext)
  useEffect(()=>{
    onAuthStateChanged(auth , (user)=>{
    if(user){
      setUser(user)
    }else{
      setUser(null)
    }
   })
  })
  return (
    <div>
      <PostProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />} />
        </Routes>
      </Router>
      </PostProvider>
    </div>
  );
}

export default App;
