import jwtFetch from "./jwt";

const RECEIVE_SPOTS = "spots/RECEIVE_SPOTS";
const RECEIVE_SPOT = "spots/RECEIVE_SPOT";
const REMOVE_SPOT = "spots/REMOVE_SPOT";

const receiveSpot = (spot) => ({
	type: RECEIVE_SPOT,
	spot
});

const receiveSpots = (spots) => ({
	type: RECEIVE_SPOTS,
	spots,
});

const removeSpot = (spotId) => ({
	type: REMOVE_SPOT,
	spotId,
});

const fetchSpots = () => async (dispatch) => {
	const response = await jwtFetch("/api/spots");
	if (response.ok) {
		const spots = await response.json();
		dispatch(receiveSpots(spots));
	}
};


 const fetchSpot = (spotId) => async (dispatch) => {
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
        case REMOVE_SPOT:
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        default:
            return state;
    }
};


export default spots;
