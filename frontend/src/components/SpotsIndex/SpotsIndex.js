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


  const handleChange = (e) => {
    debugger
  }
  return (
    spots && (
      <>
        <div className="background">
          <div className="map-wrapper">
            <div>
              <div className="search-bar">
                <div className="input-group mb-3">
                  <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split car-type-pricing" data-bs-toggle="dropdown" aria-expanded="false">
                    Car Type <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu" onChange={handleChange}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="sedan" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        Sedan
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="truck" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        Truck
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="minivan" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        Minivan
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="compact" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        Compact
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="suv" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        SUV
                      </label>
                    </div>
                  </ul>

                  <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split car-type-pricing" data-bs-toggle="dropdown" aria-expanded="false">
                    Pricing <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        $
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        $$
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        $$$
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                        $$$$
                      </label>
                    </div>
                  </ul>

                  <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" />

                  <button className="btn btn-outline-secondary car-type-pricing" type="button">Search</button>

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
