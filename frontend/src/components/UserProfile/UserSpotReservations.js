import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSpots from "./UserSpots";

const UserSpotReservations = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    // const reservation = useSelector(fetchReservation)

    const [reservation, setReservation] = useState([]);

    useEffect(() => {
        fetch()
    })

    // useEffect(() => {
    //     dispatch()
    // })

    return (
        <div className="spots-wrapper">
            <h1>No Errors Please</h1>
            
        </div>
    )
}

export default UserSpotReservations;