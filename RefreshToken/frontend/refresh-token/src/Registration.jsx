import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/register",{name,email,password})
        .then((res)=>{
           // console.log(res.data)
           navigate('/login')
        })
        .catch((err)=>{console.log(err)})
    }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    onChange={(e)=>{setName(e.target.value)}}
                    placeholder="Enter your name"
                  />
                </div>
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
                  Register
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account?{' '}
                <Link to="/login">
                <button className="btn btn-link p-0">Login</button>
                </Link>
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
