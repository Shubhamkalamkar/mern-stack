import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Register = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/register', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role
      })
    })
    const data = await res.json()
            if (data.error || !res) {
                alert("error occurred")
                console.log(data) 
            } else {
                alert("success")
                console.log(data) 
                navigate("/login")
            }
            
  }

  return (
    <div>
      <form >
        <div className="form-group">
          <label for="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className="form-group">
          <label for="Role">Role</label>
          <input type="text" className="form-control" id="role" placeholder="Role" onChange={(e)=>{setRole(e.target.value)}}/>
        </div>
       
        <button type="submit" className="btn btn-primary" onClick={handleRegister}>Register</button>
      
</form>
    </div>
  )
}
