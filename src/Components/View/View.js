import React, { useState, useEffect, useContext } from "react";
import { collection, where, getDocs ,query } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'
import { db } from "../../firebase/config";
import "./View.css";
import { PostContext } from "../../store/PostContext";
function View() {
  const [seller, setSellerDetails] = useState('');
  const { post } = useContext(PostContext);
  const navigate = useNavigate('');
  useEffect(() => {
    const getUserData = async () => {
      const sellerCollection = collection(db, 'users')
      console.log(sellerCollection)
      try {
        console.log(post.userId)
        const sellerArray = await getDocs(query(sellerCollection, where('id', '==', post.userId)));
        await sellerArray.forEach(doc => {
          setSellerDetails(doc.data())
          console.log(seller)
          console.log(post)
        })
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserData()
  }, [post])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={post.url} alt="" />
      </div>
      <div className="rightSection">
        {post &&
        <div className="productDetails">
        <p>&#x20B9; {post.price} </p>
        <span>{post.name}</span>
        <p>{post.category}</p>
        <span>{post.createdAt}</span>
      </div>}
        
       { post && <div className="contactDetails" >
          <p>Seller details</p>
          <p>{seller.username}</p>
          <p>{seller.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
