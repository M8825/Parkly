import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import "./CreateSpotForm.scss";
import SelectedState from "../SelectedStates/SelectedStates";

const SpotForm = () => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState("");
  const [photoUrl, setPhotoUrl] = useState([]);
  const [photoFile, setPhotoFile] = useState([]);
  const [carType, setCarType] = useState("");

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

  const zipCodeCheck = () => {
    if (zipCode.length > 5) {
        setZipCode(zipCode.slice(0,5));
    }
  }

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

  const handleFileChange = e => {
	const file = e.target.files[0];
	if (file) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			setPhotoFile((prev) => ([...prev, file]));
			setPhotoUrl((prev) => ([...prev, fileReader.result]));
		};
	}
  };

    const attachedphotos = (
		<div className="image-preview">
			<h2>Image preview{photoUrl}</h2>
			<img width="200px" src={photoUrl} alt="Preview" />
		</div>
	)

  return (
    <form className="createSpotForm" onSubmit={handleSubmit}>
	  <div className="createSpotContainer">
      	<h1 className="createSpotTitle">Create a new Spot!</h1>
		<label className="createPageLabel">
			<div className="inputTitle">Title:</div>
			<div className="createPageTitle">
			<input
                className="titleInput"
				type="text"
				name="title"
				value={formData.title}
				onChange={handleChange}
			/>
			</div>
		</label>
		<label className="createPageLabel">
			<div className="inputTitle">Address:</div>
			<div className="createSpotAddress">
			<input
                className="addressInput"
				type="text"
				name="address"
				value={formData.address}
				onChange={handleChange}
			/>
			</div>
		</label>
        <div className="cityState">
            <label className="createPageLabel">
                <div className="inputTitle">City:</div>
                <div>
                <input
                    className="createSpotCity"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
                </div>
            </label>
            <label className="createPageLabel">
                <div className="dropdownList">
                <SelectedState state={formData.state} handleChange={handleChange} />
                </div>
            </label>
            <label className="createPageLabel">
                <div className="inputTitle">Zip:</div>
                <input
                className="createSpotZip"
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                />
                <div>
                    {zipCodeCheck()}
                </div>
            </label>
        </div>
        <div className="rateType">
            <label className="createPageLabel">
                <div className="inputTitle">Rate Per Hour:</div>
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
                <div className="carDropDown">
                    Car Type
                    <select
                    onChange={(e) => setCarType(e.target.value)}
                    value={carType}>
                        <option value="Select">Select</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Compact">Compact</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Truck">Truck</option>
                        <option value="Minivan">Minivan</option>
                    </select>
                </div>
            </label>
        </div>
		<label className="createPageLabel">
			<div className="inputTitle">Accessibility:</div>
			<input
			type="checkbox"
			name="accessible"
			checked={formData.accessible}
			onChange={handleChange}
			/>
		</label>
		{photoUrl.length < 5 && (
            <>
                <div>
                    <input
                        label="Add a Picture"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <h5>Image preview</h5>
                <div className="image-preview">
                    {photoUrl.map(purl => {
                        return (
                            <img width="200px" src={purl} alt="Preview" />)
                    })}
                </div>
            </>
            )}
            {photoUrl.length > 4 && (
                <h1>Maximum photo is 5</h1>
            )}
		<button type="submit">Add Spot</button>
		
	  </div>
    </form>
  );
};

export default SpotForm;