import React from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ()=>{
    const[email,setEmail] = React.useState("");
    const[password,setPassword] = React.useState("");
    const navigate = useNavigate();

    React.useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/add')
        }
    })

    const handleLogin = async()=>{
        console.warn(email,password);
        let result = await fetch('http://localhost:5000/login', {
            method:'post',
            body:JSON.stringify({
                
                email,
                password
            }),
            headers:{
                'Content-Type':'application/json'
            },
        })
        result  = await result.json();
        console.warn(result)
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/add')

        }
        else{
            alert('please enter correct details.')
        }

    }

    return(
        
            <div className = 'login'>
                <h1>Login</h1>
                <input className='input-box' type='email' placeholder="Enter email " value={email} onChange={(e)=>setEmail(e.target.value)}/> 
            
                <input className='input-box' type='password' placeholder="Enter password"value={password} onChange={(e)=>setPassword(e.target.value)}/> 

                <button type="button" onClick={handleLogin}className="appButton">login</button>
            </div>
        
    )
}

export default Login;