import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getUserLocation } from "../../store/session";

import Map from "../Map/Map";
import './SplashPage.css'

function SplashPage() {
  const userLocation = useSelector(getUserLocation)
  const [center, setCenter] = useState(null)


  return (
    center && (
    <div className="splash-page">
      {/* <Navigation/> */}
      <div className="splash-page-bg">
        <div className="map-message-wrapper">
          <div className="left-side">
            <Map coordinates={[center]}/>
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
