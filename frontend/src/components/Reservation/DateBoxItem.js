import "./DateBoxItem.scss";

const DateBoxItem = ({ date }) => {

    return (
        <div className="date-box-item">
            <p>{date.getDate()}</p>
        </div>
    )

};

export default DateBoxItem;
