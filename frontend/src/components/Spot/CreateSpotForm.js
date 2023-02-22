import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import "./CreateSpotForm.scss";
import SelectedState from "../SelectedStates/SelectedStates";

const SpotForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    address: "",
    zip: "",
    city: "",
    state: "",
    size: "",
    accessible: false,
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
	// <option value="AR">AR</option>
	if (name === '') {
		name = "state"
	}
    value = value === "on" ? true : value;

    // debugger
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newSpot = dispatch(createSpot(formData));
      console.log("New Spot created:", newSpot);
      setFormData({
        address: "",
        zip: "",
        city: "",
        state: "",
        size: "",
        accessible: false,
      });
    } catch (error) {
      console.error("Failed to create Spot:", error);
    }
  };

//   const states = [
//     "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
//     "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
//     "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
//     "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
//     "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
//   ];

//   const [selectedState, setSelectedState] = useState('');


  return (
    <form onSubmit={handleSubmit}>
      <h1 className="createSpotTitle">Create a new Spot!</h1>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Rate:
        <input
          type="number"
          name="rate"
          value={formData.hourlyRate}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </label>
	  <label className='selectState'>
		<div className='dropdownList'>
			<SelectedState 
			state={formData.state}
			handleChange={handleChange} />
		</div>
	  </label>
      <label>
        Zip:
        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
        />
      </label>
      <label>
        Car Type:
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />
      </label>
      <label>
        Accessible:
        <input
          type="checkbox"
          name="accessible"
          checked={formData.accessible}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Spot</button>
    </form>
  );
};

export default SpotForm;
