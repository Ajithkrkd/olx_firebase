import React from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import {PostContext} from '../../store/PostContext'
function Posts() {

  const [products, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const {setPost} = useContext(PostContext);


  useEffect(() => {
   
    const getUserProductsFromFirebase = async () => {
      const productsCollection = collection(db, "products");
      try {
        const allProductsSnapshot = await getDocs(productsCollection);

        const allProductsData = allProductsSnapshot.docs.map((doc) =>
          doc.data()
        );

        setAllProducts(allProductsData);
      } catch (error) {
        console.error("Error getting user products:", error);
      }
    };

    getUserProductsFromFirebase();
  }, []);
  return (
    <div className="postParentDiv">
      <div className="your-class-name"></div>
      <div className="heading">
          <h3 className="mt-4 ml-3">Quick Menu</h3>
          {/* <h5>View more</span> */}
        </div>
      <div className="moreView">
        
        <div className="cards  d-flex">
          {products.map((product) => (
            <div
              className="card shadow"
              onClick={() => {
                setPost(product)
                navigate("/view");
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <p style={{ fontSize: 20, fontWeight: 700 }} className="name">
                  {" "}
                  {product.name}
                </p>
                <span style={{ fontWeight: 600, fontSize: 12 }}>
                  Category :{" "}
                </span>{" "}
                <span className="categpry">{product.category}</span>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
