import "./DisabledDates.scss"

const DisabledDates = () => {
  return (
    <div className="not-selected-yet">
      <div className="disable-date-text">
        <span>mm/dd/yyyy</span>
      </div>
      <select className="disable-time-text" tabindex="-1">
        <option>hh:mm</option>
      </select>
    </div>
  )
}


export default DisabledDates;
