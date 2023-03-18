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
		height: "30%",
	};

	useEffect(() => {
		dispatch(fetchSpot(spotId));
	}, [dispatch, spotId]);

	if (spot && images.length === 0) {
		const placeholderImages = [];
		if (spot.imageUrls.length < 4) {
			for (let i = 0; i < 4 - spot.imageUrls.length; i++) {
				placeholderImages.push("https://parklyy.s3.amazonaws.com/spots/placeholder.png");
			}
		}
		setImages([...spot.imageUrls, ...placeholderImages])
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
							<div>
								<h3>{spot.title}</h3>
								{/* TODO: Waiting for kay owner first name last name */}
								<p className="owner"></p>
							</div>

							<h5 className="show-address">
								{spot.address}. {spot.city}, {spot.state}
							</h5>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									Rate <FontAwesomeIcon icon={faDollarSign} />{" "}
									{spot.rate}
								</li>
								<li className="list-group-item">
									Type of car <FontAwesomeIcon icon={faCar} />{" "}
									{spot.size}
								</li>
								<li className="list-group-item">
									Rating <FontAwesomeIcon icon={faStar} />{" "}
									{spot.rating.toFixed(1)}
								</li>
								<li className="list-group-item">
									Accessibility{" "}
									<FontAwesomeIcon icon={faWheelchair} />{" "}
									{spot.accessible ? "Yes" : "No"}
								</li>
								<li className="list-group-item">
									Description {spot.description}
								</li>
							</ul>

							{/* <div className="show-infos">
								<p className="show-infos-info">
									<FontAwesomeIcon icon={faDollarSign} />{" "}
									{spot.rate}
								</p>
								<p className="show-infos-info">
									<FontAwesomeIcon icon={faCar} /> {" "}
									{spot.size}
								</p>
								<p className="show-infos-info">
									<FontAwesomeIcon icon={faStar} />{" "}
									{(spot.rating).toFixed(1)}
								</p>
								<p className="show-infos-info">
									<FontAwesomeIcon icon={faWheelchair} />{" "}
									{spot.accessible ? "Yes" : "No"}
								</p>
							</div> */}

							{/* <div className="discription-container">

								{spot.description}
							</div> */}

							<div className="show-reviews">
								{/* <h5> {spot.rating} </h5> */}
								{/* <h5> 91 reviews </h5> */}
							</div>

							<Reservation spot={spot} />
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default ShowPage;
