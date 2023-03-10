import "./ReservationItem.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot, deleteReservation } from "../../store/reservations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ReservationItem = ({ reservation }) => {
    const dispatch = useDispatch();
	const { startDate, endDate } = reservation;
	const history = useHistory();


	const start = new Date(startDate);
	const end = new Date(endDate);

    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteReservation(reservation._id));
    }

	const handleEditClick = (e) => {
		e.preventDefault();
		history.push(`/spots/${reservation.spot._id}`);
		// dispatch(updateReservation(reservation));
	}

	return reservation && (
		<div className="reservation-card">
			<div className="left-side-res">
				<div>
					<h1>Spot Address:</h1>
					<p>{reservation.spot.address}</p>
					<p>
						{reservation.spot.city}{", "} {reservation.spot.state}{", "}
						{reservation.spot.zip}
					</p>
				</div>
				<div>
					<h1>Spot Owner Info:</h1>
					<div>
						<p>
							{reservation.spot.owner.firstName}{" "}
							{reservation.spot.owner.lastName}
						</p>
					</div>

					<div>
						<p>{reservation.spot.owner.email}</p>
						<p>{reservation.spot.owner.phoneNumber}</p>
					</div>
				</div>
			</div>

			<div className="right-side-res">
				<div className="reservation-dates">
                    <h1>Reservation Date/Time:</h1>
                    <p><span>Start Date: </span>{start.toDateString()}</p>

                    <p><span>End Date: </span>{end.toDateString()}</p>
                </div>
				<div className="reservation-rates">
                    <h1>Reservation Price:</h1>
                    <p><span>Rate: </span>$10.50/hr</p>
                    <p><span>Total: </span>$63.00</p>
                </div>
			</div>
            <div className="delete-wrapper">
                <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={handleDeleteClick}/>
            </div>
			<div className="edit-wrapper">
				<FontAwesomeIcon icon={faPenToSquare} className="edit-icon" onClick={handleEditClick}/>
			</div>
		</div>
	);
};

export default ReservationItem;
