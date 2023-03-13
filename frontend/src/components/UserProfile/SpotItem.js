import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUserSpots, deleteSpot } from "../../store/spots";
import "./ReservationItem.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const SpotItem = ({ spot }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // Should not have to grab dates from state but instead grab the dates through each spot
    // const getDate = (state) => state.dates;
    // const date = useSelector(getDate)

    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot._id))
    }

    const handleEditClick = (e) => {
		e.preventDefault();
		// history.push({
		// 	pathname:`/spots/create/${_id}`,
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
                    {spot.date && (
                        <>
                            {/* <p>Start Date/Time: {new Date(date[0]).toDateString()}</p>
                            <p>End Date/Time: {new Date(date[1]).toDateString()}</p> */}
                            <p>Start Date/Time: {spot.date[0]}{}</p>
                            <p>End Date/Time: {spot.date[1]}</p>
                        </>
                    )}
                </div>
                <div>
                    <h1>Rate:</h1>
                    <p>${spot.rate}/hr</p>
                </div>
            </div>
            <div className="right-side-res">
                <div className="imageDisplay">
                    {spot.imageUrls.map((url) => {
                        return <img src={url} alt="imageUrl" key={url}/>
                    })}
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