import "./DateBoxItem.scss";

const DateBoxItem = ({ date, onClick }) => {
	return (
		<>
			<div className="date-box-item" onClick={e => onClick(e, date)}>
				<p>{date.toLocaleString("en-US", { weekday: "short" })}</p>
				<p>{date.toLocaleString("en-US", { day: "numeric" })}</p>
			</div>
		</>
	);
};

export default DateBoxItem;
