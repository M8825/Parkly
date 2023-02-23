import jwtFetch from './jwt';

const RECEIVE_RESERVATION = 'reservations/RECEIVE_RESERVATION';

export const getReservation = (reservationId) => state => {
    if (state && state.reservations) {
        return state.reservations[reservationId];
    }

    return null;
}

const receiveReservation = (reservation) => ({
    type: RECEIVE_RESERVATION,
    reservation
})


export const createReservation = (reservation) => async dispatch => {
    const res = await jwtFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify(reservation)
    });
    const data = await res.json();
    dispatch(receiveReservation(data));
    return data;
}


const reservations = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RESERVATION:
            return { ...state, [action.reservation._id]: action.reservation };
        default:
            return state;
    }
}

export default reservations;
