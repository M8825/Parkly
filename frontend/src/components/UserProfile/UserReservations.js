import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations, getReservations } from "../../store/reservations";
import ReservationItem from "./ReservationItem";

import "./UserReservations.scss"

const UserReservations = (props) => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const reservations = useSelector(getReservations());




    useEffect(() => {
        dispatch(fetchUserReservations(userId));
    }, [dispatch, userId]);



    debugger
    return reservations && (
        <div className="reservations-wrapper">
            {
                reservations.map((reservation) => (
                    <ReservationItem key={reservation._id} reservation={reservation} />
                ))
            }
        </div>

    );

}
export default UserReservations;
