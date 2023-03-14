import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserSpots } from "../../store/spots";
import { fetchReservations } from "../../store/reservations";
import SpotReservationItem from "./SpotReservationItem";

const UserSpotReservations = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const [userSpots, setUserSpots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const spotsData = await dispatch(fetchUserSpots(userId));
            setUserSpots(spotsData);
        };
        fetchData();
    }, [dispatch, userId]);

    useEffect(() => {
        const spotIds = userSpots.map(spot => spot._id);
        dispatch(fetchReservations(spotIds));
    }, [dispatch, userSpots]);

    return (
        <div className="spots-wrapper">
            {/* <h1>No Errors Please</h1> */}
            {userSpots.map(spot => {
                <SpotReservationItem key={spot._id} spot={spot} />
            })}
        </div>
    )
}

export default UserSpotReservations;