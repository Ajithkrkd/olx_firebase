import React, { useState, useContext, useEffect } from "react";
import "./Create.css";
import Header from "../Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { UserContext } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const imageUrl = image ? URL.createObjectURL(image) : "";

  const { user } = useContext(UserContext);
  const date = new Date();


  useEffect(()=>{
    if(!user){
      navigate('/')
      Swal.fire({
        icon :'error',
        title :'Not Logged'
        
      })
    }
    
  },[user , navigate])


  const submitHandler = async () => {
    if(name  <= 6){
     return  alert('name is  want to atleast 6 letters')
    }
    else if(category <= 6){
      return  alert('category is want atleast 6 letters')
    }
    else if(price == ''){
      return  alert('price must not be empty')
    }
    else if(image == null){
   
        return  alert('image must not be empty')
      
    }
    const storage = getStorage();
    const storageRef = ref(storage, "image" + image.name);
    try {
      await uploadBytes(storageRef, image);
      console.log("image uploaded");

      const url = await getDownloadURL(storageRef);
      console.log(url);
      console.log(user.uid);
      const productCollection = collection(db, "products");
      const productDoucment = {
        name,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: date.toDateString(),
      };
      await addDoc(productCollection, productDoucment);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header />

      <card>
        <div className="centerDiv mb-5">
          <h4 className="text-center p-2">Add product </h4>
          <label className="form-text">Name</label>
          <br />
          <input
            onChange={(e) => {
              setName(e.target.value);
              
            }}
            className="form-control border border-dark"
            aria-describedby="nameHelp"
            type="text"
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="form-control border border-dark"
            type="text"
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="form-control border border-dark"
            type="number"
            id="fname"
            name="Price"
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={imageUrl}></img>

          <br />
          <input
            className="form-control"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file" accept="image/*"
          />
          <br />
          <button
            onClick={submitHandler}
            className="uploadBtn"
           
          >
            upload and Submit
          </button>
        </div>
      </card>
    </div>
  );
};

export default Create;
