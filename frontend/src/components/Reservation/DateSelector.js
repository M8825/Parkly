import "./DateSelector.scss";

const DateSelector = ({ selectedDate, handleSelect }) => {

	return (
		<div className="date-selector">
			<span>{selectedDate.toLocaleDateString()}</span>
			<select onChange={handleSelect}>
				{[...Array(12)].map((_, i) => {
					const hour = i + 8;
					const time = `${hour.toString().padStart(2, "0")}:00`;
					return (
						<option key={i} value={time}>
							{time}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default DateSelector;
