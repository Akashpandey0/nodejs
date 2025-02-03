import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/login')
    }

    return(
        <div >
            <img alt='logo' className='logo' src='https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg'/>
            {auth ?  
                <ul className='nav-ul'>
                <li><Link to ="/">Products</Link></li>
                
                <li><Link to ="/add">Add Products</Link></li>
                
                <li><Link to ="/update">update Products</Link></li>
                
                <li><Link to ="/profile">Profile</Link></li>
               
                <li><Link to ="/SignUp" onClick={logout}>Log out ({JSON.parse(auth).name})
                </Link></li>    
                </ul>:
                <ul className='nav-ul nav-right'>
                <li><Link to ="/SignUp">SignUp</Link></li>
                <li><Link to='/login'>Login</Link></li>
                </ul>
            
            }
        </div>
    )
}

export default Nav;