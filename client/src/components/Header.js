import React from 'react'
import {Button} from 'react-bootstrap'
import './css/header.css'
import { useNavigate } from 'react-router-dom'

export const Header = ()=>{
    const navigate = useNavigate();
    
    return(
        <div className='header-container d-flex justify-content-start '>
            <div className='h-item' onClick={()=>navigate("/")}>Home</div>
            <div className='h-item' onClick={()=>navigate("cats")}>Cats</div>
            <div className='h-item' onClick={()=>navigate("/account")}>Account</div>
            <div className='h-item' onClick={()=>navigate("/admin")}>Admin</div>
            <div className='h-item' onClick={()=>navigate("/login")}>Login</div>
            <div className='h-item' onClick={()=>navigate("/register")}>Register</div>
        </div>
    )
}