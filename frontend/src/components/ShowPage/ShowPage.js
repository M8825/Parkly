import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpot, getSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import Map from "../Map/Map";
import './ShowPage.css'

const ShowPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(getSpot(spotId));

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch]);

  return (spot && (
    <>
      <div className="show-bg">
        <div className="show-wrapper">
          <div className="show-leftside">  
            <div className="show-images">
              <img src="https://sienaconstruction.com/wp-content/uploads/2017/05/test-image.jpg"></img>
              <img src="https://sienaconstruction.com/wp-content/uploads/2017/05/test-image.jpg"></img>
              <img src="https://sienaconstruction.com/wp-content/uploads/2017/05/test-image.jpg"></img>
              <img src="https://sienaconstruction.com/wp-content/uploads/2017/05/test-image.jpg"></img>
            </div>
            <div className="map-container">
            <Map />           
            </div>
            

            
              
          </div>
          <div className="show-rightside">  
            
            <div><h4>{spot.title}</h4><p className="owner">(firstname) (lastname)</p></div>
            
            <h5 className="show-address">{spot.address}. {spot.city}, {spot.state}</h5>
            
            <div className="show-infos">              
                <p className="show-infos-info"><img src={require('./dollar.png')}/>  17.5/hr</p>
                <p className="show-infos-info"><img src={require('./type.png')}/>  {spot.type}(Senda)</p>
                <p className="show-infos-info"><img src={require('./reviews.png')}/>  (4.7)</p>
                <p className="show-infos-info"><img src={require('./access.png')}/>  {spot.accessible}(No)</p>
            </div>

            <div className="discription-container">

            </div>

            <div>
              Date Picker
            </div>

            <div cl assName="show-reviews">
              <h5> - 4.98 * 91 reviews</h5>

            </div>


          </div>
        </div>
      </div>
    </>
  )
  )
}


export default ShowPage;