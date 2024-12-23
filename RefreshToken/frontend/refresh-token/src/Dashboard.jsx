import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [message,setMessage]=useState()
    const navigate=useNavigate()
    axios.defaults.withCredentials=true
    useEffect(()=>{
        axios.get("http://localhost:3001/dashboard")
        .then((res)=>{
            if(res.data.success){
setMessage(res.data.message);
            }
            else{
                navigate("/")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
  return (
    <h2>
      Dashboard {message }
    </h2>
  )
}

export default Dashboard
