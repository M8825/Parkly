import Geocode from "react-geocode";

const RECEIVE_LAT_LNG = "geocode/RECEIVE_LAT_LNG";

const receiveLatLng = (coordinates) => ({
    type: RECEIVE_LAT_LNG,
    coordinates,
});

export const getCoordinates = (state) => {
    if (state && state.geocode) {
        return state.geocode
    }

    return null;
}

export const getLatLngByAddress = (address) => async (dispatch) =>  {
	try {
        const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
		Geocode.setApiKey(GOOGLE_MAP_API_KEY);
		const response = await Geocode.fromAddress(address);

        if (response.status === "OK") {
            const { lat, lng } = response.results[0].geometry.location;
            dispatch(receiveLatLng({ lat, lng }));
        }

	} catch (error) {
		console.error(error);
	}
};



const geocodeReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LAT_LNG:
            return {...state, ...action.coordinates};
        default:
            return state
    };

}


export default geocodeReducer;
