import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div style={{display:"flex",justifyContent:"space-around",backgroundColor:"black",height:"40px",alignItems:'center'}}>
       <Link style={{color:"white"}} to='/'>Get all items</Link>
       <Link style={{color:"white"}} to='/addItem'>Add Item</Link>
      {/* <Link style={{color:"white"}} to='/singleElement'>Single Element</Link> */}
    </div>
  )
}

export default Header;
