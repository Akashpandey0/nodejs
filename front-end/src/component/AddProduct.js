import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";


const AddProduct =  ()=>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const [error,setError] = useState(false);

    //submit form data to server


    const addProduct =  async()=>{

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        // console.log(name,price,category,company);

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product',{
            method: 'post',
            body:JSON.stringify({
                name,
                price,
                category,
                userId,
                company
            }),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        })
        result = await result.json();
        toast.success("Product added successfully", { autoClose: 500 });
    }

    return(
        <div className="product">
            <h1>Add Product</h1>

            <input type = "text" placeholder="Enter product name"
            className="input-box"  
            onChange={(e)=>{setName(e.target.value)}}        
            />
            { error && !name && <span className="invalid-input">Enter valid name</span>}

            <input type = "text" placeholder="Enter product price"
            className="input-box"
            onChange={(e)=>{setPrice(e.target.value)}   }        
            />
            { error && !price && <span className="invalid-input">Enter valid price</span>}

            <input type = "text" placeholder="Enter product category"className="input-box"
            onChange={(e)=>{setCategory(e.target.value)}} 
            />
            { error && !category && <span className="invalid-input">Enter valid category</span>}

            <input type = "text" placeholder="Enter product company"className="input-box"
            onChange={(e)=>{setCompany(e.target.value)}} 
            />
            { error && !company && <span className="invalid-input">Enter valid company</span>}

            <button className="appButton"
            onClick={addProduct} 
            >
                <Link to = "/">
                add product
                </Link></button>

        </div>

    )
}

export default AddProduct;