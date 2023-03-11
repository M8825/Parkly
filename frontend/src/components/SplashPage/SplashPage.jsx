import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import { getUserCoordinates } from "../../store/session";

import Map from "../Map/Map";
import './SplashPage.css'

function SplashPage() {
  const userCoordinates = useSelector(getUserCoordinates)

  return (
    userCoordinates && (
    <div className="splash-page">
      {/* <Navigation/> */}
      <div className="splash-page-bg">
        <div className="map-message-wrapper">
          <div className="left-side">
            <Map coordinates={[userCoordinates]}/>
          </div>


          <div className="right-side">
            <div className="park-with-us">

            <h2>Most Convenient Parking in NY/NJ Area.</h2>
            {/* TODO: not for production it doesn't go anywhere */}
            <button className="btn start-btn" type="submit"><NavLink to="/index">Get started</NavLink></button>
            </div>
          </div>
        </div>

      </div>
    </div>

    )
  );
}

export default SplashPage;
