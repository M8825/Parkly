async function getCurrentPosition() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

export async function getLocation() {
	try {
		const position = await getCurrentPosition();
		const { latitude, longitude } = position.coords;

		return { lat: latitude, lng: longitude };
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getZipCode() {
	const position = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});

	const { latitude, longitude } = position.coords;
	const API_KEY = "AIzaSyC4MyCm15p_Wxa7e-P1rYMgEWstpZXorSA";

	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
	);
	const data = await response.json();

	if (data.results.length > 0) {

		// Look for the zip code in the address_components array
		const addressComponents = data.results[0].address_components;

		for (let i = 0; i < addressComponents.length; i++) {
			const types = addressComponents[i].types;

			if (types.includes("postal_code")) {
				return addressComponents[i].long_name;
			}
		}
	}

	// If no zip code is found, return null
	return null;
}
