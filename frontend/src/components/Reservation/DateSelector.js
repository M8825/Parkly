import "./DateSelector.scss";

const DateSelector = ({ selectedDate, handleSelect, timeMarker }) => {
	const convertStringToTimeObject = (hourString) => {
		return new Date(`2000-01-01T${hourString}:00`);
	};

	const renderElement = (reservationTime) => {
		return (
			<option key={reservationTime.toString()} value={reservationTime}>
				{reservationTime.getHours() + ":00"}
			</option>
		);
	};

	const getAvailableHours = () => {
		return [...Array(12)].map((_, i) => {
			const hour = i + 8;

			const reservationTime = convertStringToTimeObject(
				hour.toString().padStart(2, "0")
			);

			const availabilityTime = convertStringToTimeObject(timeMarker.time);

			if (timeMarker.type === "start") {
				if (selectedDate.getDate() === timeMarker.firstDate.getDate()) {
					if (reservationTime >= availabilityTime) {
						return renderElement(reservationTime);
					}
				} else {
					return renderElement(reservationTime);
				}
			} else if (timeMarker.type === "end") {
				if (selectedDate === timeMarker.lastDate) {
					if (reservationTime <= availabilityTime) {
						return renderElement(reservationTime);
					}
				} else {
					return renderElement(reservationTime);
				}
			}
		});
	};
	return (
		<div className="date-selector">
			<span>{selectedDate.toLocaleDateString()}</span>
			<select onChange={handleSelect}>{getAvailableHours()}</select>
		</div>
	);
};

export default DateSelector;
