import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {useNavigate, useParams} from 'react-router-dom'

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    getProductDetails();
  }, []);
  
const getProductDetails = async()=>{
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  //submit form data to server

  const updateProduct = async () => {
    console.log(name, price, category, company);

    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      method:'put',
      body:JSON.stringify({name, price, category, company}),
      headers:{
        'Content-Type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.log(result)
    navigate('/');
    toast.success("product updated successfuly", { autoClose: 1 });
  };

  return (
    <div className="product">
      <h1>Update Product</h1>

      <input
        type="text"
        placeholder="Enter product name"
        className="input-box"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      

      <input
        type="text"
        placeholder="Enter product price"
        className="input-box"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
     

      <input
        type="text"
        placeholder="Enter product category"
        className="input-box"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      

      <input
        type="text"
        placeholder="Enter product company"
        className="input-box"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
       <button className="appButton" onClick={updateProduct}>
        Update product
      </button>
    </div>
  );
};

export default UpdateProduct;
