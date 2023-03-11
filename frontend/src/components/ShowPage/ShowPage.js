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
import "./ShowPage.css";

const ShowPage = () => {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector(getSpot(spotId));
	const [images, setImages] = useState([]);

	useEffect(() => {
		dispatch(fetchSpot(spotId));
	}, [dispatch]);

	if (spot && images.length === 0) {
		const placeholderImages = [];
		if (spot.imageUrls.length < 4) {
			for (let i = 0; i < 4 - spot.imageUrls.length; i++) {
				placeholderImages.push("https://parklyy.s3.amazonaws.com/spots/placeholder.png");
			}
		}
		setImages([...spot.imageUrls, ...placeholderImages])
		debugger
	}

	return (
		spot && (
			<>
				<div className="show-bg">
					<div className="show-wrapper">
						<div className="show-leftside">
							<div className="show-images">
								{
									images.map(image => {
										return <img src={image} alt="parking_spot"/>
									})
								}
							</div>
							<div className="map-container">
								<Map />
							</div>
						</div>
						<div className="show-rightside">
							<div>
								<h4>{spot.title}</h4>
								{/* TODO: Waiting for kay owner first name last name */}
								<p className="owner"></p>
							</div>

							<h5 className="show-address">
								{spot.address}. {spot.city}, {spot.state}
							</h5>

							<div className="show-infos">
								<p className="show-infos-info">
									<FontAwesomeIcon icon={faDollarSign} />{" "}
									17.5/hr
								</p>
								<p className="show-infos-info">
									{/* <img src={require("./type.png")} />{" "} */}
									<FontAwesomeIcon icon={faCar} /> {spot.size}
								</p>
								<p className="show-infos-info">
									{/* <img src={require("./reviews.png")} /> (4.7) */}
									<FontAwesomeIcon icon={faStar} />{" "}
									{(spot.rating).toFixed(1)}
								</p>
								<p className="show-infos-info">
									{/* <img src={require("./access.png")} />{" "} */}
									<FontAwesomeIcon icon={faWheelchair} />{" "}
									{spot.accessible ? "Yes" : "No"}
								</p>
							</div>

							<div className="discription-container">
								{spot.description}
							</div>

							<div className="show-reviews">
								<h5> - 4.98 </h5>
								<h5> 91 reviews </h5>
							</div>

							<div className="reservation">
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
