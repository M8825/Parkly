import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots, getSpots } from "../../store/spots";
import { getUserZip } from "../../store/session";
import SearchBar from "./SearchBar";
import Map from "../Map/Map";
import SpotsIndexItem from "./SpotsIndexItem";

import "./SpotsIndex.scss";

const SpotsIndex = () => {
	const dispatch = useDispatch();

	const spots = useSelector(getSpots()); // select spots form spots store
	const userZip = useSelector(getUserZip); // grab user zip code from session store

	const [carType, setCarType] = useState([]); // array of car types - checkbox values
	const [address, setAddress] = useState(""); // search bar input
	const [searchWords, setSearchWords] = useState([]); // array of search words - car type and address

	// Google Maps atomic styling
	const containerStyle = {
		width: "100%",
		height: "100%",
		borderRadius: "20px !important",
		padding: "20px",
	};

	useEffect(() => {
		// takes searchWords as an argument
		// it's an array of car types and address
		dispatch(fetchSpots(searchWords));
	}, [dispatch, searchWords]);

	// set up default user zip code as default search word when page loads
	// or input is empty
	if (searchWords.length === 0) {
		setSearchWords([userZip]);
		setAddress(userZip);
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


	const handleSearchBarChange = (e) => {
		e.preventDefault();

		setAddress(e.target.value);
	};

	// on click listener for "No matching results in the {address}" button
	// button appears when there are no spots for the search key words in db
	const handleNoSpotsClickForZip = (e) => {
		e.preventDefault();

		setSearchWords(["10028"]);
		setAddress("10028");
	};


	// handle search
	const handleSearchSubmit = (e) => {
		e.preventDefault();

		// update searchWords which will trigger useEffect to fetch spots
		// based on searchWords array of car types and address
		setSearchWords([...carType, address]);
	};

	return (
		spots && (
			<>
				<div className="background">
					<div className="map-wrapper">
						<div>
							<SearchBar
								handleCarTypeChange={handleCarTypeChange}
								handleSearchBarChange={handleSearchBarChange}
								address={address}
								handleSearchSubmit={handleSearchSubmit}
							/>

							<div className="left-map">
								<Map
									containerStyle={containerStyle}
									spots={spots}
								/>
							</div>
						</div>

						<div className="index-side">
							{spots.length > 0 ? (
								spots.map((spot, i) => (
									<SpotsIndexItem key={i} spot={spot} />
								))
							) : (
								<div className="no-spots-for-zip">
									<h4>
										No matching results in the {address}{" "}
									</h4>
									<p>
										Please select{" "}
										<button
											onClick={handleNoSpotsClickForZip}
											className="btn-no-spots-for-zip"
										>
											here
										</button>{" "}
										for more options.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default SpotsIndex;
