import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function Navbar() {
  const {data,setData}=useState("")
  const user = JSON.parse(localStorage.getItem('user'));
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    // fetch('/mypost', {
    //   headers: {
    //     'authorization': 'Bearer ' + localStorage.getItem('jwt')
    //   }
    // })
    //   .then(res => res.json())
    //   .then(result => {
    //     setData(result);
    //   });
  }, []);

  const Navigate = useNavigate();

  const removeLocal = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    Navigate('/login');
  };

  const RenderList = () => {
    if (user) {
      return (
        <>
          <li>
            <NavLink className="nav-links" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <button className="btn btn-link nav-links" onClick={removeLocal}>
              Logout
            </button>
          </li>
          <li>
          <button className="btn btn-link nav-links" to="/profile">
            Profile
          </button>
        </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink className="nav-links" to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-links" to="/signup">
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-links" to="/guide-signup">
              Guide Signup
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-links" to="/admin-signup">
              Admin Signup
            </NavLink>
          </li>
        </>
      );
    }
  };
  
  

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            My App
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <RenderList />
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-lg-none">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink className="navbar-brand" to="/">
            My App
          </NavLink>
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body nav-menu">
              <RenderList />
            </div>
          </div>
        </div>
      </nav>
    </>
      )}