import React,{useState,useEffect} from "react";
import {useNavigate}  from 'react-router-dom';

const SignUp = ()=>{
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/add')
        }
    })
    const collectdata = async()=>
    {
        console.warn(name,email,password)
        let result = await fetch('http://localhost:5000/register',
        {
            method:'post',
            body:JSON.stringify({
                name,
                email,
                password
            }),
            headers:{
                'Content-Type':'application/json'
            },
        })
        result = await result.json()
        console.warn(result)
        localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token',JSON.stringify(result.auth));
        navigate('/add');
    }
    
    return (
        <div  className="register">
            <h1>Register</h1>
            <input className="input-box" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter name"></input>
            
            <input className="input-box"value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email address"></input>
            
            <input className="input-box"value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password"></input>
            
            <button type="button" onClick={collectdata} className="signup">SignUp</button>

        </div>
    )
}

export default SignUp;