import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSpots, getUserSpots } from "../../store/spots";
import { fetchReservations, getReservations } from "../../store/reservations";
import SpotReservationItem from "./SpotReservationItem";

const UserSpotReservations = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const spots = useSelector(getUserSpots(userId));
    const reservations = useSelector(state => state.spots.reservations);

    useEffect(() => {
        dispatch(fetchUserSpots(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        if (spots) {
            dispatch(fetchReservations(spots))
        }
    }, [dispatch, spots])


    // const spots = useSelector(getUserSpots(userId));
    // const reservations = useSelector(getReservations(spots))
    // useEffect(() => {
    //     dispatch(fetchUserSpots(userId))
    //     // setUserSpots(spotsData)
    // }, [dispatch, userId])


    return spots && reservations && (
        <div className="spots-wrapper">
            <h1>No Errors Please</h1>
            {spots.map((spot) => (
                spot.reservations.map((reservation) => (
                    <SpotReservationItem key={reservation._id} reservation={reservation} />
                ))
            ))}
        </div>
    )
}

export default UserSpotReservations;