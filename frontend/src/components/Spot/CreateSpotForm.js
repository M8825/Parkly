import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import "./CreateSpotForm.scss";

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
        value = value === "on" ? true: value;

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

	return (
		<form onSubmit={handleSubmit}>
			<h1 className='createSpotTitle'>Create a new Spot!</h1>
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
				Zip:
				<input
					type="text"
					name="zip"
					value={formData.zip}
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
			<label>
				State:
				<input
					type="text"
					name="state"
					value={formData.state}
					onChange={handleChange}
				/>
			</label>
			<label>
				Size:
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
