import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const handleLogin = async (e)=>{
    e.preventDefault();
    const res = await fetch('/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await res.json();
    if(data.error || !data){
      console.log("error occurred")
      console.log(data)
      alert(data.error)
    } else{
      console.log("login successful")
      console.log(data)
      alert(data.message)
      navigate("/admin")
    }
   }
  return (
    <div>
      <form >
    
    <div className="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
    </div>
    
   
    <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
  
</form>
</div>
  )
}
