import '../Spot/CreateSpotForm.scss';

const SelectedTime = ({time, handleChange}) => {

    return (
        <label style={{display: "flex", flexDirection: "column"}}>
            <select onChange={(e) => handleChange(e)} value={time}>
                <option value="Select">Select</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
            </select>
        </label>
    );
};

export default SelectedTime;