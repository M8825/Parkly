import Map from "../Map/Map";
import './SplashPage.css'


function SplashPage() {

  return (
    <div class="splash-page">
      {/* <Navigation/> */}
      <div className="splash-page-bg">
        <div className="map-message-wrapper">
        <div className="left-side">
          <Map />
        </div>


        <div className="right-side">
          <h2>Most affordable place in NY/NJ Parking Area.</h2>
        </div>
        </div>

      </div>
    </div>
  );
}

export default SplashPage;
