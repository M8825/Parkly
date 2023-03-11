import '../Spot/CreateSpotForm.scss';

const SelectedTime = ({time, handleTimeChange}) => {
    const times = [
        { value: "08:00", label: "08:00" },
        { value: "09:00", label: "09:00" },
        { value: "10:00", label: "10:00" },
        { value: "11:00", label: "11:00" },
        { value: "12:00", label: "12:00" },
        { value: "13:00", label: "13:00" },
        { value: "14:00", label: "14:00" },
        { value: "15:00", label: "15:00" },
        { value: "16:00", label: "16:00" },
        { value: "17:00", label: "17:00" },
        { value: "18:00", label: "18:00" },
        { value: "19:00", label: "19:00" },
        { value: "20:00", label: "20:00" }
    ];

    return (
        <div style={{ display: "flex" }}>
            <label style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
                {/* <span>Start Time</span> */}
                <select onChange={(e) => handleTimeChange(e.target.value)} value={time}>
                    <option value="">Select</option>
                    {times.map((time) => (
                        <option key={time.value} value={time.value}>
                            {time.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default SelectedTime;