import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";

import logo from "./logo.png";
import AuthModal from "../Auth/AuthModal";
import "./Navigation.css";

function Navigation() {
  const loggedIn = useSelector((state) => state && state.session ? !!state.session.user : false);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        // <button onClick={logoutUser}>Logout</button>
        <button onClick={logoutUser} className="btn logout-btn" type="submit">Logout</button>

      );
    } else {
      return <AuthModal />;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink exact to="/" className="navbar-brand" href="#">
          <img className="logo" src={logo} alt="logo" />
        </NavLink>
        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <div className="box-nav left-nav">
              <li className="nav-item">
                <NavLink exact to="/" className="navbar-brand" href="#">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact to="/" className="navbar-brand" href="#">
                  Rent
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact to="/" className="navbar-brand" href="#">
                  Lend
                </NavLink>
              </li>
            </div>

            <div className="box-nav right-nav">
              <li className="nav-item">
              <NavLink exact to="/" className="navbar-brand" href="#">
                  Contact us
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
