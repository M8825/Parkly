import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpot, getSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faDollarSign,
	faCar,
	faStar,
	faWheelchair,
} from "@fortawesome/free-solid-svg-icons";
import Map from "../Map/Map";
import Reservation from "../Reservation/Reservation";
import "./ShowPage.scss";

const ShowPage = () => {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector(getSpot(spotId));
	const [images, setImages] = useState([]);

	// Map styling. Will be passed to a Map component
	const containerStyle = {
		width: "100%",
		height: "120%",
		borderRadius: "20px !important",
	};

	useEffect(() => {
		dispatch(fetchSpot(spotId));
	}, [dispatch, spotId]);

	if (spot && images.length === 0) {
		const placeholderImages = [];
		if (spot.imageUrls.length < 4) {
			for (let i = 0; i < 4 - spot.imageUrls.length; i++) {
				placeholderImages.push(
					"https://parklyy.s3.amazonaws.com/spots/placeholder.png"
				);
			}
		}
		setImages([...spot.imageUrls, ...placeholderImages]);
	}

	return (
		spot && (
			<>
				<div className="show-bg">
					<div className="show-wrapper">
						<div className="show-leftside">
							<div className="show-images">
								{images.map((image, i) => {
									return (
										<img
											key={i}
											src={image}
											alt="parking_spot"
										/>
									);
								})}
							</div>
							<div className="map-container">
								<Map
									containerStyle={containerStyle}
									spots={[spot]}
								/>
							</div>
						</div>
						<div className="show-rightside">
							<div className="title-wrapper">
								<h3 className="spot-title">{spot.title}</h3>
								<p className="owner">
									{spot.owner.firstName +
										" " +
										spot.owner.lastName}
								</p>
							</div>

							<h5 className="show-address">
								{spot.address}, {spot.city}, {spot.state},{" "}
								{spot.zip}
							</h5>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									<FontAwesomeIcon
										icon={faDollarSign}
										className="spot-icon"
									/>
									<p className="attribute-text">
										{spot.rate}
									</p>
								</li>
								<li className="list-group-item">
									<FontAwesomeIcon
										icon={faCar}
										className="spot-icon"
									/>
									<p className="attribute-text">
										{spot.size}
									</p>
								</li>
								<li className="list-group-item">
									<FontAwesomeIcon
										icon={faStar}
										className="spot-icon"
									/>
									<p className="attribute-text">
										{spot.rating.toFixed(1)}
									</p>
								</li>
								<li className="list-group-item">
									<FontAwesomeIcon
										icon={faWheelchair}
										className="spot-icon"
									/>
									<p className="attribute-text">
										{spot.accessible ? "Yes" : "No"}
									</p>
								</li>
								<li className="desc">
									<h3>Description:</h3>
									{spot.description}
								</li>
							</ul>

							<div className="show-reviews">
								<Reservation spot={spot} />
							</div>

						</div>
					</div>
				</div>
			</>
		)
	);
};

export default ShowPage;
