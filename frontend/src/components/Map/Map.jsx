import React, { useState, useRef } from "react";
import NavLink from "react-router-dom/NavLink";
import {
	GoogleMap,
	LoadScript,
	MarkerF,
	InfoWindowF,
	useJsApiLoader
} from "@react-google-maps/api";
import mapConf from "./MapConf";

import "./Map.scss";

const Map = ({
	containerStyle = {
		width: "100%",
		height: "100%",
		borderRadius: "20px !important",
		padding: "20px",
	},
	spots,
}) => {

	const centerCoordinates = spots[0] ? spots[0].coordinates : { lat: 40.777766, lng: -73.950658 };
	const [activeMarker, setActiveMarker] = useState(null);
	const markerRefs = useRef([]);
	const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

	const handleMarkerClick = (index) => {
		setActiveMarker(index);
	};

	return (
		<LoadScript googleMapsApiKey = {API_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={centerCoordinates} // Grab first coordinate from an Array and center map to it
				zoom={15}
				style={{ borderRadius: "100px", padding: "20px" }}
				options={{
					styles: mapConf,
					disableDefaultUI: true
				}}
			>
				<>
					{spots.map((spot, index) => {
						return (
							<div ref={markerRefs} key={index}>
								<MarkerF
									position={spot.coordinates}
									onMouseOver={() =>
										// callback function doesn't take any argument because we dot't need it in handle click
										handleMarkerClick(
											index
										)
									}
								>
									{activeMarker === index && (
										// Add info window with spot details if user click on a marker
										<InfoWindowF
											anchor={markerRefs.current[index]}
											zIndex={3}
										>
											{/* parse spot info */}
											<div className="info-window">
												<NavLink
													to={`/spots/${spot._id}`}
													className="info-window-link"
												>
													<h3>Type: {spot.size}</h3>
													<p>Rate: ${spot.rate}</p>
												</NavLink>
											</div>
										</InfoWindowF>
									)}
								</MarkerF>
							</div>
						);
					})}
				</>
			</GoogleMap>
		</LoadScript>
	);
};

export default React.memo(Map);
