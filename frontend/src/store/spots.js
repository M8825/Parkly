import jwtFetch from "./jwt";

const RECEIVE_SPOTS = "spots/RECEIVE_SPOTS";
const RECEIVE_FILTERED_SPOTS = "spots/RECEIVE_FILTERED_SPOTS";
const RECEIVE_SPOT = "spots/RECEIVE_SPOT";
const RECEIVE_NEW_SPOT = "spots/RECEIVE_NEW_SPOT";
const REMOVE_SPOT = "spots/REMOVE_SPOT";
const RECEIVE_ERRORS = "spots/RECEIVE_ERRORS";

const receiveNewSpot = (spot) => ({
	type: RECEIVE_NEW_SPOT,
	spot,
});

const receiveSpot = (spot) => ({
	type: RECEIVE_SPOT,
	spot,
});

const receiveSpots = (spots) => ({
	type: RECEIVE_SPOTS,
	spots,
});

const receiveFilteredSpots = (spots) => ({
	type: RECEIVE_FILTERED_SPOTS,
	spots,
});

const removeSpot = (spotId) => ({
	type: REMOVE_SPOT,
	spotId,
});

const receiveErrors = (errors) => ({
	type: RECEIVE_ERRORS,
	errors,
});

// returns an array of spots from the state once they are fetched
export const getSpots = () => (state) => {
	if (state && state.spots) {
		return Object.values(state.spots);
	}

	return [];
};

export const getUserSpots = (userId) => (state) => {
    if (state && state.spots) {
        return Object.values(state.spots).filter((spot) => {
            return spot.owner === userId
        }
    )};
    return [];
}

// returns a single spot from state based on the spotId
export const getSpot = (spotId) => (state) => {
    if (state && state.spots[spotId]) {
        return state.spots[spotId];
	}

	return null;
};

// generate coordinates from spots in state
export const getCoordinates = () => (state) => {
	if (state && state.spots) {
		return Object.values(state.spots).map((spot) => spot.coordinates);
	}

	return [];
};

// fetch all spots from the database.
// filter the spots based on the searchArray
// when the searchArray is empty, return all spots
export const fetchSpots =
	(searchArray = []) =>
	async (dispatch) => {
		const response = await jwtFetch("/api/spots");

		if (response.ok) {
			const spots = await response.json();

			if (searchArray.length > 0 && searchArray[0] !== "") {
				// filter spots by car type
				const filteredBySize = spots.filter((spot) =>
					searchArray.includes(spot.size) ? spot : null
				);

				// filter spots by street address, city, state, or zip
				const filteredByAddress = spots.filter((spots) => {
					return (
						searchArray.includes(spots.address) ||
						searchArray.includes(spots.city) ||
						searchArray.includes(spots.state) ||
						searchArray.includes(spots.zip)
					);
				});

				// combine the filtered results from above
				let searchResults = [];

				if (filteredBySize.length > 0 && filteredByAddress.length > 0) {
					for (let i = 0; i < filteredBySize.length; i++) {
						for (let j = 0; j < filteredByAddress.length; j++) {
							if (
								filteredBySize[i]._id ===
								filteredByAddress[j]._id
							) {
								searchResults.push(filteredBySize[i]);
							}
						}
					}
				} else {
					// in case one of the search filters are empty just concatenate all filter results
					searchResults = filteredByAddress.concat(filteredBySize);
				}

				// notice the difference between receiveSpots and receiveFilteredSpots
				// we use receiveFilteredSpots to render the search results
				dispatch(receiveFilteredSpots(searchResults));
			} else {
				// if the searchArray is empty, return all spots with receiveSpots() thunk action
				dispatch(receiveSpots(spots));
			}
		}
	};

// fetch a single spot from the database based on spotId
export const fetchSpot = (spotId) => async (dispatch) => {
	const response = await jwtFetch(`/api/spots/${spotId}`);

	if (response.ok) {
		const spot = await response.json();
		dispatch(receiveSpot(spot));
	}
};

// create spots with images
export const createSpot = (spotData, images) => async (dispatch) => {
	// initialize form data to send spot information with images to backend
	const formData = new FormData();

	// stringify coordinates and append to form data
	// we need to stringify the coordinates because we can not send objects through form data
	for (let key in spotData) {
		// find coordinate key
		if (key === "coordinates") {
			formData.append(
				"coordinates",
				JSON.stringify(spotData.coordinates) // pass stringified coordinates
			);
		} else {
			formData.append(key, spotData[key]);
		}
	}

	Array.from(images).forEach((image) => formData.append("images", image));

	try {
		const response = await jwtFetch("/api/spots", {
			method: "POST",
			body: formData,
		});

		debugger

		const spot = await response.json();

		return dispatch(receiveNewSpot(spot));
	} catch (err) {
		const res = await err.json();

		if (res.statusCode === 400) {
			return dispatch(receiveErrors(res.errors));
		}
	}
};

export const fetchUserSpots = (userId) => async dispatch => {
    const response = await jwtFetch(`/api/users/spots/${userId}`);
    const data = await response.json();
    dispatch(receiveSpots(data));
    return data;
}

export const updateSpot = (spotData, images) => async (dispatch) => {
	const formData = new FormData();

	// stringify coordinates and append to form data
	// we need to stringify the coordinates because we can not send objects through form data
	for (let key in spotData) {
		// find coordinate key
		if (key === "coordinates") {
			formData.append(
				"coordinates",
				JSON.stringify(spotData.coordinates) // pass stringified coordinates
			);
		} else {
			formData.append(key, spotData[key]);
		}
	}

	Array.from(images).forEach((image) => formData.append("images", image));

	const response = await jwtFetch(`/api/spots/${spotData._id}`, {
		method: "PATCH",
		body: formData,
	});

	if (response.ok) {
		const spot = await response.json();
		dispatch(receiveNewSpot(spot));
	}
};

export const deleteSpot = (spotId) => async (dispatch) => {
	const response = await jwtFetch(`/api/spots/${spotId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(removeSpot(spotId));
	}
};

// TODO: add it to store
export const spotErrorsReducer = (state = null, action) => {
	switch (action.type) {
		// TODO: clear session errors implement
		case RECEIVE_ERRORS:
			return action.errors;
		default:
			return state;
	}
};

const spots = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_SPOT:
			return {
				...state,
				[action.spot._id]: action.spot,
			};
		case RECEIVE_NEW_SPOT:
			return {
				...state,
				newSpot: action.spot,
			};
		case RECEIVE_SPOTS:
			return {
				...state,
				...action.spots,
			};
		case RECEIVE_FILTERED_SPOTS:
			return { ...action.spots };
		case REMOVE_SPOT:
			const newState = { ...state };
            for (let key in newState) {
                if (newState[key]._id === action.spotId) {
                    delete newState[key];
                }
            }
			return newState;
		default:
			return state;
	}
};

export default spots;
