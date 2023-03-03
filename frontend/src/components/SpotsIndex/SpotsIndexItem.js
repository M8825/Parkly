// create react component with ES fat arrow syntax and export it as default
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"

const SpotsIndexItem = ({ spot }) => {

    return (
        <div className="card">

            <div className="card-header">{spot.size}</div>
            <div className="card-body">
                <h5 className="card-title">{spot.title}</h5>
                <p className="card-text">{spot.address} {spot.city} {spot.state} {spot.zip}</p>
                <div className="btn-container">
                    <div className="rating">
                        <FontAwesomeIcon icon={faStar} />
                        <p className="card-text">{spot.rating}</p>
                    </div>
                        <Link to={`/spots/${spot._id}`}>
                            <button href="#" className="btn btn-primary see-btn">See more</button>
                        </Link>
                </div>
            </div>
        </div>
    )

};

export default SpotsIndexItem;
