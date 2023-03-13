import React, { useState, useRef } from "react";
import {
	GoogleMap,
	LoadScript,
	MarkerF,
	InfoWindowF,
} from "@react-google-maps/api";

const Map = ({
	containerStyle = {
		width: "100%",
		height: "100%",
		borderRadius: "20px !important",
		padding: "20px",
	},
	coordinates,
}) => {
	const [activeMarker, setActiveMarker] = useState(null);
	const markerRefs = useRef([]);

	const handleMarkerClick = (marker, index) => {
		debugger;
		setActiveMarker(index);
	};

	return (
		<LoadScript googleMapsApiKey="AIzaSyC4MyCm15p_Wxa7e-P1rYMgEWstpZXorSA">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={coordinates[0]} // Grab first coordinate from an Array and center map to it
				zoom={15}
				style={{ borderRadius: "100px", padding: "20px" }}
			>
				<>
					{coordinates.map((coordinate, index) => {
						return (
							<div ref={markerRefs} key={index}>
								<MarkerF
									position={coordinate}
									onClick={() =>
										handleMarkerClick(coordinate, index)
									} // callback function doesn't take any argument because we dot't need it in handle click
								>
									{activeMarker === index && (
										// Add info window with spot details if user click on a marker
										<InfoWindowF
											onCloseClick={() =>
												setActiveMarker(null)
											}
											anchor={markerRefs.current[index]}
										>
											{/* parse spot info */}
											<div>
												<h3>Title</h3>
												<p>Content</p>
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
