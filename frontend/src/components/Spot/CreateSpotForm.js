import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpot, updateSpot } from "../../store/spots";
import { getLatLngByAddress, getCoordinates } from "../../store/geocodeReducer";
import SelectedState from "../SelectedStates/SelectedStates";
import SelectedTime from "../SelectedTimes/SelectedTimes";
import Calendar from "react-calendar";

import "./CreateSpotForm.scss";
import "react-calendar/dist/Calendar.css";

const SpotForm = ({ spot }) => {
	const fileRef = useRef(null);

	const errors = useSelector((state) =>
		state && state.errors.spot ? state.errors.spot : null
	);

	const coordinates = useSelector(getCoordinates)

	const dispatch = useDispatch();
	const [images, setImages] = useState([]);
	const [imageUrls, setImageUrls] = useState([]);
	const [carType, setCarType] = useState("");
	const [editing, setEditing] = useState(false);
	const [page, setPage] = useState("first");
	const [value, setValue] = useState("");
	const [date, setDate] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [fullAddress, setFullAddress ]= useState(null);
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const [formData, setFormData] = useState({
		title: "",
		address: "",
		zip: "",
		city: "",
		state: "",
		rate: "",
		size: "",
		rating: 4.4,
		accessible: false,
		description: "",
		startTime: "",
		endTime: "",
		date: [],
	});

	useEffect(() => {
		if (spot) {
			setFormData({
				title: spot.title,
				address: spot.address,
				zip: spot.zip,
				city: spot.city,
				state: spot.state,
				rate: spot.rate,
				size: spot.size,
				accessible: spot.accessible,
				description: spot.description,
				date: spot.date,
				startTime: spot.startTime,
				endTime: spot.endTime,
			});
			setEditing(true);
		}

		if (fullAddress) {
			debugger
			dispatch(getLatLngByAddress(fullAddress))
		}

	}, [dispatch, spot, fullAddress]);

	const handleChange = (event) => {
		let { name, value } = event.target;
		if (name === "") {
			name = "state";
		}
		value = value === "on" ? true : value;

		if (name === "rate") {
			value = value < 0 ? 0 : value;
		}

		if (name === "zip") {
			if (value.length > 5) {
				setFormData((formData) => ({
					...formData,
					[name]: value.slice(0, 5),
				}));
				return;
			}
		}

		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (editing) {
				await dispatch(updateSpot({ ...formData, id: spot.id }));
			} else {


				debugger
				formData.coordinates = coordinates

				await dispatch(createSpot(formData, images));
				setImages([]); // <-- ADD THIS LINE
				setImageUrls([]); // <-- ADD THIS LINE
			}
		} catch (error) {
			console.error("Failed to create/update Spot:", error);
		}
	};

	const handleNext = (e) => {
		e.preventDefault();

		switch (page) {
			case "first":
				setPage("second");

				const fullAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`;
				setFullAddress(fullAddress)

				break;
			case "second":
				setPage("first");
				break;
			default:
				setPage("first");
				break;
		}
	};

	const onDateChange = (newDate) => {
		const today = new Date();
		if (today.getDate() <= newDate[0].getDate() && newDate[1] >= today) {
			setDate(newDate);

			setFormData((formData) => ({
				...formData,
				date: date,
			}));
		}
	};

	const onStartChange = (time) => {
		setStartTime(time);

		setFormData((formData) => ({
			...formData,
			startTime: time,
		}));
	};

	const onEndChange = (time) => {
		setEndTime(time);

		setFormData((formData) => ({
			...formData,
			endTime: time,
		}));
	};

	const updateFiles = async (e) => {
		const files = e.target.files;
		setImages(files);

		if (files.length !== 0) {
			let filesLoaded = 0;
			const urls = [];

			Array.from(files).forEach((file, index) => {
				const fileReader = new FileReader();
				fileReader.readAsDataURL(file);

				fileReader.onload = () => {
					urls[index] = fileReader.result;
					if (++filesLoaded === files.length) setImageUrls(urls);
				};
			});
		} else {
			setImageUrls([]);
		}
	};

	return (
		<form className="createSpotForm" onSubmit={handleSubmit}>
			{page === "first" && (
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
								placeholder="Title"
							/>
						</div>
					</label>
					{/* <div>{errors?.email}</div> */}
					<label className="createPageLabel">
						<div className="inputTitle">Address:</div>
						<div className="createSpotAddress">
							<input
								className="addressInput"
								type="text"
								name="address"
								value={formData.address}
								onChange={handleChange}
								placeholder="Address"
							/>
						</div>
					</label>
					<div className="errors">{errors?.address}</div>
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
									placeholder="City"
								/>
							</div>
						</label>
						<label className="createPageLabel">
							<div className="dropdownList">
								<SelectedState
									state={formData.state}
									handleChange={handleChange}
								/>
							</div>
						</label>
						<label className="createPageLabel">
							<div className="inputTitle">Zip Code:</div>
							<input
								className="createSpotZip"
								type="text"
								name="zip"
								value={formData.zip}
								onChange={handleChange}
								placeholder="Zip Code"
							/>
						</label>
					</div>
					<div className="rateType">
						<label className="createPageLabel">
							<div className="inputTitle">Rate Per Hour:</div>
							<input
								className="createSpotRate"
								type="number"
								name="rate"
								value={formData.rate}
								onChange={handleChange}
								placeholder="$"
							/>
						</label>
						<label className="createPageLabel">
							<div className="inputTitle">
								<div className="carType">Car Type:</div>
								<select
									className="carTypeDrop"
									name="size"
									value={formData.size}
									onChange={handleChange}
								>
									<option value="Select">Select</option>
									<option value="Sedan">Sedan</option>
									<option value="SUV">SUV</option>
									<option value="Compact">Compact</option>
									<option value="Motorcycle">
										Motorcycle
									</option>
									<option value="Truck">Truck</option>
									<option value="Minivan">Minivan</option>
								</select>
							</div>
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
					</div>
					<button
						className="nextPage"
						type="submit"
						value={value}
						onClick={handleNext}
					>
						Next Page
					</button>
				</div>
			)}
			{page === "second" && (
				<div className="createSpotContainer">
					<div className="calendar">
						<p className="calendarAvail">Availability</p>
						<Calendar
							value={date.length > 0 ? date : startDate}
							onChange={onDateChange}
							minDate={startDate}
							selectRange={true}
						/>
						<br />
						<div className="displayDate">
							<p className="startTime">
								Start Date/Time:{" "}
								{date && date[0] ? date[0].toDateString() : []}
							</p>
							<SelectedTime
								value={formData.startTime}
								handleTimeChange={onStartChange}
							/>
						</div>
						<div className="displayDate">
							<p className="startTime">
								End Date/Time:{" "}
								{date && date[1] ? date[1].toDateString() : []}
							</p>
							<SelectedTime
								value={formData.endTime}
								handleTimeChange={onEndChange}
							/>
						</div>
					</div>
					<label className="createPageLabel">
						<div className="inputDesc">
							Description:
							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								placeholder="Description"
							></textarea>
						</div>
					</label>

					{images.length < 5 && (
						<>
							<div>
								<input
									label="Add a Picture"
									type="file"
									accept=".jpg, .jpeg, .png, .webp"
									ref={fileRef} // <-- ADD THIS LINE
									multiple
									onChange={updateFiles} // TODO: implement update files
								/>
							</div>
							<h5>Image preview</h5>
							<div className="image-preview">
								{imageUrls.length !== 0
									? imageUrls.map((purl) => {
											return (
												<img
													width="200px"
													src={purl}
													alt="Preview"
												/>
											);
									  })
									: undefined}
							</div>
						</>
					)}

					{images.length > 4 && <h1>Maximum photo is 5</h1>}
					<div className="secondPageButtons">
						<button
							className="prevPage"
							type="submit"
							value={value}
							onClick={handleNext}
						>
							Previous Page
						</button>
						<button className="createButton" type="submit">
							Submit
						</button>
					</div>
				</div>
			)}
		</form>
	);
};

export default SpotForm;
