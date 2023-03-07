// import '../Spot/CreateSpotForm.scss';

// const SelectedTime = ({time, handleChange}) => {

//     return (
//         <label style={{display: "flex", flexDirection: "column"}}>
//             <select onChange={(e) => handleChange(e)} value={time}>
//                 <option value="Select">Select</option>
//                 <option value="08:00">08:00</option>
//                 <option value="09:00">09:00</option>
//                 <option value="10:00">10:00</option>
//                 <option value="11:00">11:00</option>
//                 <option value="12:00">12:00</option>
//                 <option value="13:00">13:00</option>
//                 <option value="14:00">14:00</option>
//                 <option value="15:00">15:00</option>
//                 <option value="16:00">16:00</option>
//                 <option value="17:00">17:00</option>
//                 <option value="18:00">18:00</option>
//                 <option value="19:00">19:00</option>
//                 <option value="20:00">20:00</option>
//             </select>
//         </label>
//     );
// };

// export default SelectedTime;




import '../Spot/CreateSpotForm.scss';

const SelectedTime = ({startTime, endTime, handleTimeChange}) => {
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
                <select onChange={(e) => handleTimeChange(e.target.value)} value={startTime}>
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