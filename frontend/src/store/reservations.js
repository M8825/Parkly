import jwtFetch from './jwt';

const RECEIVE_RESERVATION = 'reservations/RECEIVE_RESERVATION';
const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS';
const REMOVE_RESERVATION = 'reservations/REMOVE_RESERVATION';

export const getReservation = (reservationId) => state => {
    if (state && state.reservations) {
        return state.reservations[reservationId];
    }

    return null;
}

export const getReservations = () => (state) => {
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

const removeReservation = (reservationId) => ({
    type: REMOVE_RESERVATION,
    reservationId
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

export const fetchUserReservations = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/reservations/${userId}`);
    const data = await res.json();
    dispatch(receiveReservations(data));
    return data;
}

export const deleteReservation = (reservationId) => async dispatch => {
    const res = await jwtFetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    dispatch(removeReservation(reservationId));
    return data;
}

export const attachReservation  = (reservation) => async dispatch => {
    dispatch(receiveReservation(reservation));
};

const reservations = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_RESERVATIONS:
            return { ...state, ...action.reservations };
        case RECEIVE_RESERVATION:
            return { ...state, [action.reservation._id]: action.reservation };
        case REMOVE_RESERVATION:
            delete newState[action.reservationId];
            return { ...newState };
        default:
            return state;
    }
}

export default reservations;
