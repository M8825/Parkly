import jwtFetch from './jwt';

const RECEIVE_RESERVATION = 'reservations/RECEIVE_RESERVATION';
const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS';

export const getReservation = (reservationId) => state => {
    if (state && state.reservations) {
        return state.reservations[reservationId];
    }

    return null;
}

export const getReservations = () => (state) => {
    debugger
    if (state && state.reservations) {
        return Object.values(state.reservations);
    }

    return [];
}

const receiveReservation = (reservation) => ({
    type: RECEIVE_RESERVATION,
    reservation
})

const receiveReservations = (reservations) => ({
    type: RECEIVE_RESERVATIONS,
    reservations
})


export const createReservation = (reservation) => async dispatch => {
    const res = await jwtFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify(reservation)
    });
    const data = await res.json();
    dispatch(receiveReservations(data));
    return data;
}

export const fetchUserReservations = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/reservations/${userId}`);
    const data = await res.json();
    dispatch(receiveReservations(data));
    return data;
}


const reservations = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RESERVATION:
            return { ...state, [action.reservation._id]: action.reservation };
        case RECEIVE_RESERVATIONS:
            return { ...state, ...action.reservations };
        default:
            return state;
    }
}

export default reservations;
