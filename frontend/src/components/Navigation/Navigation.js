import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import './Navigation.css'
import AuthModal from '../Auth/AuthModal';

function Navigation() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg" >
      <div className="container-fluid">
        <NavLink exact to="/" className="navbar-brand" href="#">
          <img className='logo' src={logo} alt="logo" />
        </NavLink>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <div className='box-nav left-nav'>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Rent
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Lend
              </a>
            </li>
            </div>
            
            <div className='box-nav right-nav'>  
                     <li className="nav-item">
              <a className="nav-link" href="#">
                Contact Us
              </a>
            </li>
            <li className="nav-item dropdown">
                <AuthModal />
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
           </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
