import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots, getSpots } from "../../store/spots";
import Map from "../Map/Map";
import './SpotsIndex.scss'

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
                <div className="input-group mb-3">
                  <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    Car Type<span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Sedan</a></li>
                    <li><a className="dropdown-item" href="#">Truck</a></li>
                    <li><a className="dropdown-item" href="#">Minivan</a></li>
                    <li><a className="dropdown-item" href="#">Compact</a></li>
                    <li><a className="dropdown-item" href="#">SUV</a></li>
                  </ul>

                  <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    Pricing<span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Give me range</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                    <li><a className="dropdown-item" href="#">Separated link</a></li>
                  </ul>

                  <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
                
                    <button className="btn btn-outline-secondary" type="button">Search</button>
               
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
