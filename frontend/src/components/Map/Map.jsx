import React, { useState, useRef } from "react";
import NavLink from "react-router-dom/NavLink";
import {
	GoogleMap,
	LoadScript,
	MarkerF,
	InfoWindowF,
	InfoBox,
} from "@react-google-maps/api";
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
	const [activeMarker, setActiveMarker] = useState(null);
	const markerRefs = useRef([]);

	const handleMarkerClick = (marker, index) => {
		setActiveMarker(index);
	};

	return (
		<LoadScript googleMapsApiKey="AIzaSyC4MyCm15p_Wxa7e-P1rYMgEWstpZXorSA">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={spots[0].coordinates} // Grab first coordinate from an Array and center map to it
				zoom={15}
				style={{ borderRadius: "100px", padding: "20px" }}
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
											spot.coordinates,
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
