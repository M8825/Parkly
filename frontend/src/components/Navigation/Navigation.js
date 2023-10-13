import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import { useLocation } from "react-router-dom";
import logonavy from "./navy-logo.png";
import logo from "./logo.png";

import { useLinks, usePage } from "./navigation-utils";

import "./Navigation.css";

function Navigation() { const location = useLocation();
  const loggedIn = useSelector((state) => state && state.session ? !!state.session.user : false);
  const currentUserId = useSelector((state) => state && state.session && state.session.user ? state.session.user._id : null);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // identify which page we're on
  const currentLocation = usePage(location);

  const getLinks = useLinks(loggedIn, logoutUser);

  return currentLocation && (
  <nav className={`navbar navbar-expand-lg ${currentLocation}`}>
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
              {location.pathname === '/index'?
              <NavLink exact to="/index" className="navbar-brand on-page" href="#">
                  <span>Rent</span>
                </NavLink>
                :
                <NavLink exact to="/index" className={`navbar-brand ${location.pathname === '/' ? 'should-be-green' : null }`} href="#">
                  <span>Rent</span>
                </NavLink>

               }

              </li>
              <li className="nav-item">
                {location.pathname === '/spots/create' ?
                <NavLink exact to="/spots/create" className="navbar-brand on-page" href="#">
                  <span>Lend</span>
                </NavLink>
                :
                <NavLink exact to="/spots/create" className={`navbar-brand ${location.pathname === '/' ? 'should-be-green' : null }`} href="#">
                  <span>Lend</span>
                </NavLink>
                }
              </li>
                <li className="nav-item">
                  {location.pathname === `/users/${currentUserId}` ?
                  <NavLink exact to={`/users/${currentUserId}`} className="navbar-brand on-page" href="#">
                    <span>Profile</span>
                  </NavLink>
                  :
                  <NavLink exact to={`/users/${currentUserId}`} className={`navbar-brand ${location.pathname === '/' ? 'should-be-green' : null }`} href="#">
                    <span>Profile</span>
                  </NavLink>
                  }
                </li>
            </div>
            <div className="box-nav right-nav">
              <li className="nav-item">
              <NavLink exact to="/contact" className={`navbar-brand ${location.pathname === '/' ? 'should-be-green' : null }`} href="#">
                  <span>Contact us</span>
                </NavLink>
              </li>

              {getLinks}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
