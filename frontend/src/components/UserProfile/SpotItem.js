import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUserSpots, deleteSpot } from "../../store/spots";
import "./ReservationItem.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const SpotItem = ({ spot }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.owner._id));
    }

    const handleEditClick = (e) => {
		e.preventDefault();
		// history.push({
		// 	pathname:`/spots/create`,
		// 	state: {spot: spot}
		// });
		dispatch(fetchUserSpots(spot._id));
	}

    return spot && (
        <div className="reservation-card">
            <div className="left-side-res">
                <div>
                    <h1>Address:</h1>
                    <p>{spot.address}</p>
                    <p>{spot.city}{", "} {spot.state}{", "}{spot.zip}</p>
                </div>
                <div>
                    <h1>Availability:</h1>
                    {/* {console.log(spot.date)} */}
                    {spot.date && (
                        <p>{new Date(spot.date[0]).toDateString()} - {new Date(spot.date[1]).toDateString()}</p>
                    )}
                    {/* <p>{spot.date}</p> */}
                </div>
                <div>
                    <h1>Rate:</h1>
                    <p>${spot.rate}/hr</p>
                </div>
            </div>
            <div className="right-side-res">
                {/* insert images on right side */}
                {/* {spot.imageUrls} */}
                <img src={spot.imageUrls} alt="imageUrls"/>
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