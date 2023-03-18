// Helper method for getLocation() that grabs the user's current position
async function getCurrentPosition() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

// Grabs and returns the user's current location as an object with lat and lng properties
export async function getLocation() {
	try {
		const position = await getCurrentPosition();
		const { latitude, longitude } = position.coords;

		return { lat: latitude, lng: longitude };
	} catch (error) {
		return { lat: 40.777222, lng: -73.951792 };

	}
}

// Based on the user's coordinates, returns the zip code of the user.
// Utilizes the Google Maps Geocoding API.

export async function getZipCode(coordinates) {
	const { lat, lng } = coordinates;
	const API_KEY = "AIzaSyC4MyCm15p_Wxa7e-P1rYMgEWstpZXorSA";

	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
	);
	const data = await response.json();

	if (data.results.length > 0) {

		// Look for the zip code in the address_components array
		const addressComponents = data.results[0].address_components;

		for (let i = 0; i < addressComponents.length; i++) {
			const types = addressComponents[i].types;

            // return the zip code if it is found
			if (types.includes("postal_code")) {
				return addressComponents[i].long_name;
			}
		}
	}

	// If no zip code is found, return null
	return null;
}
