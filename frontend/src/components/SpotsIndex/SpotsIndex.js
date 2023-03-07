import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots, getSpots } from "../../store/spots";
import Map from "../Map/Map";
import './SpotsIndex.css'

import SpotsIndexItem from "./SpotsIndexItem";

const SpotsIndex = () => {
  const dispatch = useDispatch();
  const spots = useSelector(getSpots());

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    spots && (
      <>
        <div className="background">
          <div className="map-wrapper">
            <div>
              <div className="search-bar">
                <div class="input-group">
                  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                  <button type="button" class="btn btn-outline-primary">search</button>
                </div>
              </div>

              <div className="left-map">
                <Map />
              </div>
            </div>

            <div className="index-side">


              {spots.map((spot, i) => (
                <SpotsIndexItem key={i} spot={spot} />
              ))}

            </div>
          </div>

        </div>

      </>
    )
  );
};

export default SpotsIndex;
