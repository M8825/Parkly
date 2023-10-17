import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./ReservationItem.scss"

const SpotItem = ({ spot }) => {
    const dispatch = useDispatch();

    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot._id))
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
                            <p>Start Date/Time: {new Date(spot.date[0]).toDateString()}</p>
                            <p>End Date/Time: {new Date(spot.date[1]).toDateString()}</p>
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
            <NavLink to={`/spots/edit/${spot._id}`}>
                <div className="edit-wrapper">
                    <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
                </div>
            </NavLink>
            <div className="delete-wrapper">
                <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={handleDeleteClick}/>
            </div>
        </div>
    )
}

export default SpotItem;
