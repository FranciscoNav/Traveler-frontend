import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    const link = {
      border: 'grey solid 1px',
      width:'100px',
      padding:'10px',
      margin: '0 6px 6px',
      textDecoration: 'none',
      color: 'white',
      background:"rgba(187, 189, 194, 0.664)",
    }
  
    const active = {
      background: '#3c6ae9',
      border: 'black solid 1px'
    }
  
    return (
      <div className='navbar'>
        <NavLink to="/" exact style={link} activeStyle={active}>Home </NavLink>
        <NavLink to="/trips" exact style={link} activeStyle={active}> Trips List </NavLink>
      </div>
    );
  };
  
  export default Navigation;
  