const RECEIVE_DATES = "spot/RECEIVE_DATES";

const receiveDates = (dates) => ({
	type: RECEIVE_DATES,
	dates,
});

export const getDates = (range) => (state) => {
	if (state && state.dates) {
		const startDate = new Date(range[0]);
		const endDate = new Date(range[1]);

		return Object.values(state.dates).filter(
			(date) => date > startDate && date < endDate
		);
	}

	return [];
};

export const getDate = (dateNum) => (state) => {
	if (state && state.dates) {
		for (let i = 0; i < Object.values(state.dates).length; i++) {
			if (Object.values(state.dates)[i].getDate() === dateNum) {
				return Object.values(state.dates)[i];
			}
		}

		return null;
	}

	return [];
};

export const generateDates = () => (dispatch) => {
	const dates = [];
	const today = new Date();

	for (let i = 0; i < 14; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		dates.push(date);
	}

	dispatch(receiveDates(dates));
};

const dates = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_DATES:
			return action.dates;
		default:
			return state;
	}
};

export default dates;
