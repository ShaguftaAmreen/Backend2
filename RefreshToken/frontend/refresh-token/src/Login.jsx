import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()
    axios.defaults.withCredentials=true;
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/login",{email,password})
        .then((res)=>{
            if(res.data.success){
               navigate("/dashboard") 
            }
            else{
                navigate("/")
            }
            console.log(res.data)
           //navigate('/login')
        })
        .catch((err)=>{console.log(err)})
    }



  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <p className="text-center mt-3">
                Don't have an account?
                <Link to="/register" ><button className="btn btn-link p-0">Register</button></Link>
                
              </p>
           </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
