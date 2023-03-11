import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot, deleteSpot } from "../../store/spots";
import "./ReservationItem.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const SpotItem = ({ spot }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot._id));
    }

    const handleEditClick = (e) => {
		e.preventDefault();
		history.push({
			pathname:`/spots/${spot._id}`,
			state: {spot: spot}
		});
		// dispatch(updateSpot(spot._id));
	}

    return spot && (
        <div className="reservation-card">
            <div className="left-side-res">
                <div>
                    <h1>Address:</h1>
                    <p>{spot.address}</p>
                    <p>{spot.city}{", "} {spot.state}{", "}{spot.zip}</p>
                </div>
            </div>
            <div className="right-side-res">
                <div className="reservation-dates">
                    <h1>Availability:</h1>
                    <p><span>Rate: </span>${spot.rate}/hr</p>
                </div>
            </div>
            <div className="edit-wrapper">
				<FontAwesomeIcon icon={faPenToSquare} className="edit-icon" onClick={handleEditClick}/>
			</div>
            <div className="delete-wrapper">
                <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={handleDeleteClick}/>
            </div>
        </div>
    )
}

export default SpotItem;