import Geocode from "react-geocode";

const RECEIVE_LAT_LNG = "geocode/RECEIVE_LAT_LNG";
const RECEIVE_COORDINATES = 'geocode/RECEIVE_COORDINATES'

// const receiveLatLng = (coordinates) => ({
//     type: RECEIVE_LAT_LNG,
//     coordinates,
// });

const receiveCoordinates = (coordinates) => ({
    type: RECEIVE_COORDINATES,
    coordinates,
});

// export const getLatLngByAddress = (address) => async (dispatch) =>  {
// 	try {
// 		Geocode.setApiKey("AIzaSyDjeZ25bTcc8oOxF2TZiu9Co42kqbMKcBU");
// 		const response = await Geocode.fromAddress(address);

//         if (response.status === "OK") {
//             const { lat, lng } = response.results[0].geometry.location;
//             dispatch(receiveCoordinates({ lat, lng }));
//         }

// 	} catch (error) {
// 		console.error(error);
// 	}
// };


export const getCoordinatesByAddress = (addresses) => async (dispatch) => {
    try {
        Geocode.setApiKey("AIzaSyDjeZ25bTcc8oOxF2TZiu9Co42kqbMKcBU");
        // const coordinates = await addresses.slice(0, 2).map(async (address) => {
            const response = await Geocode.fromAddress(addresses[0]);

            // debugger
            if (response.status === "OK") {
                const { lat, lng } = response.results[0].geometry.location;
                console.log("HERE")
                dispatch(receiveCoordinates({ lat, lng }));

            }
            //  else {
                // return null;
            // }
        // });

        // debugger
    } catch (error) {
        console.error(error);
    }
};



const geocodeReducer = (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_LAT_LNG:
            newState.geocode = action.coordinates;
            return newState;
        case RECEIVE_COORDINATES:
            debugger
            return { ...state, ...action.coordinates}
        default:
            return newState
    };
}


export default geocodeReducer;
