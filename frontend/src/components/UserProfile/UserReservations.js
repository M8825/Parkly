import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchUserReservations,
	getReservations,
} from "../../store/reservations";
import ReservationItem from "./ReservationItem";

import "./UserReservations.scss";

const UserReservations = (props) => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const reservations = useSelector(getReservations());

	useEffect(() => {
		dispatch(fetchUserReservations(userId));
	}, [dispatch, userId]);

	return (
		reservations && (
			<div className="reservations-wrapper">
				{/* We are filtering the reservations array using reservations.spot.owner because,
                 when we dispatch the creation of a new reservation and handle it in the relevant
                case in the reservations reducer, the received reservation is structured
                differently from the reservations fetched for an active user.
                The RECEIVE_RESERVATION case in the reducer adds the newly created reservation
                abnormally to the reservations array. By filtering the reservations array using
                reservations.spot.owner, we ensure that only reservations with an owner are
                rendered in the ReservationItem component. */}
				{reservations
					.filter((reservations) => reservations?.spot?.owner)
					.map((reservation) => (
						<ReservationItem
							key={reservation._id}
							reservation={reservation}
						/>
					))}
			</div>
		)
	);
};
export default UserReservations;
