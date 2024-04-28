import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify';
import "./login.css";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
    toast.success("Successfully Logout")
  }
  return (
    <div >
      <nav className="navbar fixed-top navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Employee</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item home login">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item about login">
          <Link className="nav-link" to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
      <Link className="btn login" to="/login" role="button">Login</Link>
      <Link className="btn login" to="/signup" role="button">Signup</Link>
      </form>: <button onClick={handleLogout} className='btn login logout'>Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
