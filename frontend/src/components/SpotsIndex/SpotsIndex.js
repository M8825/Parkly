import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots, getSpots } from "../../store/spots";
import { getUserZip } from "../../store/session";
import Map from "../Map/Map";
import "./SpotsIndex.scss";

import SpotsIndexItem from "./SpotsIndexItem";

const SpotsIndex = () => {
	const dispatch = useDispatch();
	const spots = useSelector(getSpots());
	const userZip = useSelector(getUserZip);

	const [coordinates, setCoordinates] = useState([]);

	const [carType, setCarType] = useState([]);
	const [address, setAddress] = useState("");
	const [searchWords, setSearchWords] = useState([]);

	const containerStyle = {
		width: "100%",
		height: "100%",
		borderRadius: "20px !important",
		padding: "20px",
	};

	useEffect(() => {
		dispatch(fetchSpots(searchWords));
	}, [dispatch, searchWords]);

	if (searchWords.length === 0) {
		setSearchWords([userZip]);
		setAddress(userZip);
	}

	// Genearet coordinates from accessable spots in state for map markers
	if (spots.length > 0 && coordinates.length === 0) {
		let coords = [];

		for (let spot of spots) {
			// Only key into coordinates if they exist for a spot
			if (spot.coordinates) {
				coords.push(spot.coordinates);
			}
		}

		setCoordinates([...coords]);
	}

	// Handle car type checkbox click
	const handleCarTypeChange = (e) => {
		e.preventDefault();

		// If car type is already in carType array, remove it
		if (carType.includes(e.target.value)) {
			setCarType(carType.filter((type) => type !== e.target.value));
		} else {
			// Add car type to carType array on checkbox click
			setCarType((previousCarType) => [
				...previousCarType,
				e.target.value,
			]);
		}
	};

	const handleSearchChange = (e) => {
		e.preventDefault();

		setAddress(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		setSearchWords([...carType, address]);
	};

	return (
		spots && (
			<>
				<div className="background">
					<div className="map-wrapper">
						<div>
							<div className="search-bar">
								<div className="input-group mb-3">
									<button
										type="button"
										className="btn btn-secondary dropdown-toggle dropdown-toggle-split car-type-pricing"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Car Type{" "}
										<span className="visually-hidden">
											Toggle Dropdown
										</span>
									</button>
									<ul
										className="dropdown-menu"
										onChange={handleCarTypeChange}
									>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value="Sedan"
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												Sedan
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value="Truck"
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												Truck
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value="Minivan"
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												Minivan
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value="Compact"
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												Compact
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value="SUV"
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												SUV
											</label>
										</div>
									</ul>
									<button
										type="button"
										className="btn btn-secondary dropdown-toggle dropdown-toggle-split car-type-pricing"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Pricing{" "}
										<span className="visually-hidden">
											Toggle Dropdown
										</span>
									</button>
									<ul className="dropdown-menu">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value=""
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												$
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value=""
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												$$
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value=""
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												$$$
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												value=""
												id="defaultCheck1"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck1"
											>
												$$$$
											</label>
										</div>
									</ul>

									<input
										type="text"
										className="form-control"
										aria-label="Text input with segmented dropdown button"
										onChange={handleSearchChange}
										value={address}
									/>

									<button
										className="btn btn-outline-secondary car-type-pricing"
										type="button"
										onClick={handleSearchSubmit}
									>
										Search
									</button>
								</div>
							</div>

							<div className="left-map">
								<Map
									containerStyle={containerStyle}
									coordinates={coordinates}
								/>
							</div>
						</div>

						<div className="index-side">
							{spots.map((spot, i) => (
								<SpotsIndexItem key={i} spot={spot} />
							))}
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default SpotsIndex;
