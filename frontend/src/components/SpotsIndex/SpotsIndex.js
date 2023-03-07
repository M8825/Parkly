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
                {/* <div class="input-group">
                  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                  <button type="button" class="btn btn-outline-primary">search</button>
                </div> */}

                <div class="input-group mb-3">
                  <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    Car Type<span class="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Sedan</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                    <li><a class="dropdown-item" href="#">Separated link</a></li>
                  </ul>

                  <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    Pricing<span class="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Sedan</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                    <li><a class="dropdown-item" href="#">Separated link</a></li>
                  </ul>

                  <input type="text" class="form-control" aria-label="Text input with segmented dropdown button"/>


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
