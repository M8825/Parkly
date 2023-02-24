import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations, getReservations } from "../../store/reservations";

const UserReservations = (props) => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const reservations = useSelector(getReservations());




    useEffect(() => {
        dispatch(fetchUserReservations(userId));
    }, [dispatch, userId]);



    return reservations && (
        <>
            {
                reservations.map((reservation) => (
                    <div key={reservation.id}>
                        <div>{reservation.spotId}</div>
                        <div>{reservation.startDate}</div>
                        <div>{reservation.endDate}</div>
                    </div>
                ))
            }
        </>

    );

}
export default UserReservations;
