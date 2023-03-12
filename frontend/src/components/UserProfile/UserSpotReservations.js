import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSpots from "./UserSpots";

const UserSpotReservations = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    // const reservation = useSelector(fetchReservation)

    useEffect(() => {
        dispatch()
    })
    return (
        <h1>No Errors Please</h1>
    )
}

export default UserSpotReservations;