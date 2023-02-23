import "./DateBoxItem.scss";

const DateBoxItem = ({ date, onClick }) => {

    return (
        <div className="date-box-item" onClick={onClick}>
            <p>{date.getDate()}</p>
        </div>
    )

};

export default DateBoxItem;
