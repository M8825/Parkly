import jwtFetch from "./jwt";

const RECEIVE_SPOTS = "spots/RECEIVE_SPOTS";
const RECEIVE_FILTERED_SPOTS = "spots/RECEIVE_FILTERED_SPOTS";
const RECEIVE_SPOT = "spots/RECEIVE_SPOT";
const REMOVE_SPOT = "spots/REMOVE_SPOT";

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
		debugger;
		const response = await jwtFetch("/api/spots");
		if (response.ok) {
			const spots = await response.json();

			if (searchArray.length > 0) {
				const filteredBySize = spots.filter((spot) =>
					searchArray.includes(spot.size) ? spot : null
				);

				const filteredByAddress = spots.filter((spots) => {
					if (
						searchArray.includes(spots.address) ||
						searchArray.includes(spots.city) ||
						searchArray.includes(spots.state) ||
						searchArray.includes(spots.zip)
					) {
						return spots;
					}
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
					searchResults = filteredByAddress.concat(filteredBySize)
				}

				debugger;
				dispatch(receiveFilteredSpots(searchResults));
			} else {
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

export const createSpot = (spotData) => async (dispatch) => {
	const response = await jwtFetch("/api/spots", {
		method: "POST",
		body: JSON.stringify(spotData),
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		const spot = await response.json();
		dispatch(receiveSpot(spot));
		return spot;
	} else {
		throw new Error("Failed to create Spot");
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

const spots = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_SPOT:
			return {
				...state,
				[action.spot._id]: action.spot,
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
			delete newState[action.spotId];
			return newState;
		default:
			return state;
	}
};

export default spots;
