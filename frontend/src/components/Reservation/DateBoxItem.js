import "./DateBoxItem.scss";

const DateBoxItem = ({ date, onClick }) => {

    return (
        <div className="date-box-item" onClick={onClick}>
            <p>{date.toLocaleString('en-US', { weekday: 'short' })}</p>
            <p>{date.getDate()}</p>
        </div>
    )

};

export default DateBoxItem;
