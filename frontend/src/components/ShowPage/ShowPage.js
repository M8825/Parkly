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
    
    return ( spot &&
     <h1>{spot.address}</h1>   
    )
}


export default ShowPage;