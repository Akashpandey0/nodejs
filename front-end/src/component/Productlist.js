import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import  { Link } from "react-router-dom"

const ProductList = ()=>{

    const [products,setProducts] = useState([])

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result)
    }
    // console.warn(products)
    const deleteProduct = async(id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"DELETE",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            getProducts();
            toast.success("deleted successfully", { autoClose: 1000 });
        }
    }

    const searchHandle=async(e)=>{
        let key = e.target.value;
        if(key){

            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }
        else{
            getProducts();
        }
    }

    return(
        <div className="product-list">
            ProductList
            <input type = "text"className="search-product-box" placeholder="search product"onChange={searchHandle}/>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>operation</li>
                </ul>

                {
                    products.length>0 ? products.map((item,index)=>
                        <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={()=>{
                            deleteProduct(item._id)
                        }}>Delete</button>
                        <Link to={"/update/" + item._id}>update</Link>
                        </li>
                        </ul>
                    )
                    : <h1>No result found</h1>
                }
                
        </div>
    );
}

export default ProductList;