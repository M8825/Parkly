import React, { useState, useRef, useEffect, useCallback } from "react";
import NavLink from "react-router-dom/NavLink";
import {
	GoogleMap,
	MarkerF,
	InfoWindowF,
	LoadScriptNext
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { mapStyle, zoomScale } from "../../utils/mapsUtils";

import "./Map.scss";

const Map = ({containerStyle , spots}) => {
	const { pathname }= useLocation();
	const [isShowPage, setIsShowPage] = useState(false);

	useEffect(() => {
		if (pathname.split('/')[1] === 'spots') {
			setIsShowPage(true);
		}
	}, [pathname]);

	const centerCoordinates = spots[0] ? spots[0].coordinates : { lat: 40.777766, lng: -73.950658 };
	const [activeMarker, setActiveMarker] = useState(null);
	const markerRefs = useRef([])

	const handleMarkerClick = useCallback((index) => {
		setActiveMarker(index);
	}, []);

	const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || '';

	return (
		<LoadScriptNext googleMapsApiKey = {API_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={centerCoordinates} // Grab first coordinate from an Array and center map to it
				zoom={zoomScale(isShowPage)}
				options={{
					disableDefaultUI: true,
					styles: mapStyle(isShowPage),
					draggable: !isShowPage
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
		</LoadScriptNext>
	);
};

Map.defaultProps = {
	containerStyle: {
		width: "100%",
		height: "100%",
		borderRadius: "20px !important",
		padding: "20px",
	}
};

export default React.memo(Map);
