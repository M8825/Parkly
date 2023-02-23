import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import { useLocation } from "react-router-dom";
import logonavy from "./navy-logo.png";
import logo from "./logo.png";
import AuthModal from "../Auth/AuthModal";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();

  if (location.pathname === '/'){
    debugger
  }

  const loggedIn = useSelector((state) => state && state.session ? !!state.session.user : false);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <button onClick={logoutUser} className="btn logout-btn" type="submit">Logout</button>

      );
    } else {
      return <AuthModal />;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
      {
        location.pathname === '/' 
        ? 
        <NavLink exact to="/" className="navbar-brand" href="#">
          <img className="logo" src={logo} alt="logo" />
        </NavLink>
        :
        <NavLink exact to="/" className="navbar-brand" href="#">
          <img className="logo" src={logonavy} alt="logo" />
        </NavLink>

      }

        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <div className="box-nav left-nav">
              <li className="nav-item">
                <NavLink exact to="/" className={`navbar-brand ${location.pathname === '/' ? 'should-be-green' : null }`} href="#">
                  <span>Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
              {location.pathname === '/index'?
              <NavLink exact to="/" className="navbar-brand on-page" href="#">
                  <span>Rent</span>
                </NavLink>
                : 
                <NavLink exact to="/" className={`navbar-brand ${location.pathname === '/' ? 'should-be-green' : null }`} href="#">
                  <span>Rent</span>
                </NavLink>

               }
              
              </li>
              <li className="nav-item">
              <NavLink exact to="/" className={`navbar-brand ${location.pathname === '/' ? 'should-be-green' : null }`} href="#">
                  <span>Lend</span>
                </NavLink>
              </li>
            </div>

            <div className="box-nav right-nav">
              <li className="nav-item">
              <NavLink exact to="/" className={`navbar-brand ${location.pathname === '/' ? 'should-be-green' : null }`} href="#">
                  <span>Contact us</span>
                </NavLink>
              </li>

              {getLinks()}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
