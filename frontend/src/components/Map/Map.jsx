import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";


const Map = ({containerStyle, coordinates}) => {


	return(
		<LoadScript googleMapsApiKey="AIzaSyC4MyCm15p_Wxa7e-P1rYMgEWstpZXorSA"
		>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={coordinates[0]} // Grab first coordinate from an Array and center map to it
				zoom={15}
				style={{ borderRadius: "100px", padding: "20px"}}
			>
				{/* Child components, such as markers, info windows, etc. */}
				<>
					{coordinates.map((coordinate) => {
						return <MarkerF key={coordinate._id} position={coordinate} />;
					})}
				</>
			</GoogleMap>
		</LoadScript>

	);
};

export default React.memo(Map);
