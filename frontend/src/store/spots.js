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

export const getSpots = () => (state) => {
	if (state && state.spots) {
		return Object.values(state.spots);
	}

	return [];
};

export const getSpot = (spotId) => (state) => {
	if (state && state.spots) {
		return state.spots[spotId];
	}

	return null;
};

export const fetchSpots =
	(searchArray = []) =>
	async (dispatch) => {
		const response = await jwtFetch("/api/spots");
		if (response.ok) {
			const spots = await response.json();

			if (searchArray.length > 0) {
				const filteredBySize = spots.filter((spot) =>
					searchArray.includes(spot.size) ? spot : null
				);

				const filteredByAddress = spots.filter((spots) => {
						return searchArray.includes(spots.address) ||
						searchArray.includes(spots.city) ||
						searchArray.includes(spots.state) ||
						searchArray.includes(spots.zip)
				});

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
					searchResults = filteredByAddress.concat(filteredBySize);
				}

				dispatch(receiveFilteredSpots(searchResults));
			} else {
				debugger
				dispatch(receiveSpots(spots));
			}
		}
	};

export const fetchSpot = (spotId) => async (dispatch) => {
	const response = await jwtFetch(`/api/spots/${spotId}`);

	if (response.ok) {
		const spot = await response.json();
		dispatch(receiveSpot(spot));
	}
};



export const createSpot = (spotData, images) => async (dispatch) => {
	const formData = new FormData();


	for (let key in spotData) {
		if (key === "coordinates") {
			formData.append("coordinates", JSON.stringify(spotData.coordinates))
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

		const spot = await response.json();

		return dispatch(receiveNewSpot(spot));
	} catch (err) {
		const res = await err.json();

		if (res.statusCode === 400) {
			return dispatch(receiveErrors(res.errors));
		}
	}
};

export const updateSpot = (spotData) => async (dispatch) => {
	const { _id } = spotData;
	const response = await jwtFetch(`/api/spots/${_id}`, {
		method: "PATCH",
		body: JSON.stringify(spotData),
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		const spot = await response.json();
		dispatch(receiveSpot(spot));
		return spot;
	} else {
		throw new Error("Failed to update Spot");
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
			}
		case RECEIVE_SPOTS:
			return {
				...state,
				...action.spots,
			};
		case RECEIVE_FILTERED_SPOTS:
			return { ...action.spots };
		case REMOVE_SPOT:
			const newState = { ...state };
			delete newState[action.spotId];
			return newState;
		default:
			return state;
	}
};

export default spots;
