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
    if (name === "") {
      name = "state";
    }
    value = value === "on" ? true : value;

    // rate below is not working
    if (name === "rate") {
      value = value < 0 ? 0 : value;
    }

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newSpot = dispatch(createSpot(formData));
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

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="createSpotTitle">Create a new Spot!</h1>
      <label className="createPageLabel">
        <div className="inputTitle">Title:</div>
        <div className="createPageTitle">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
      </label>
      <label className="createPageLabel">
        <div className="inputTitle">Rate:</div>
        <div>
          <input
		  	className="createSpotRate"
            type="number"
            name="rate"
            value={formData.hourlyRate}
            onChange={handleChange}
			placeholder="$"
          />
        </div>
      </label>
      <label className="createPageLabel">
        <div className="inputTitle">Address:</div>
        <div className="createSpotAddress">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </label>
      <label className="createPageLabel">
        <div className="inputTitle">City:</div>
        <div className="createSpotCity">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
      </label>
      <label className="selectState">
        <div className="dropdownList">
          <SelectedState state={formData.state} handleChange={handleChange} />
        </div>
      </label>
      <label className="createPageLabel">
        <div className="inputTitle">Zip:</div>
        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
        />
      </label>
      <label className="createPageLabel">
        <div className="inputTitle">Car Type:</div>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />
      </label>
      <label className="createPageLabel">
        <div className="inputTitle">Accessibility:</div>
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