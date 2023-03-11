import { useSelector, useDispatch  } from "react-redux";
import { NavLink} from 'react-router-dom';
import { getUserCoordinates, getUserZip } from "../../store/session";

import Map from "../Map/Map";
import './SplashPage.css'

function SplashPage() {
  const dispatch = useDispatch();
  const userCoordinates = useSelector(getUserCoordinates)
  const userZip = useSelector(getUserZip)

  useEffect(() => {
    dispatch()
  }, [input]);
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
