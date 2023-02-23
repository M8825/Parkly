import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DateSelector from "./DateSelector";
// import { CarouselNextButton, CarouselPrevButton } from "./CarouselButton";

import DateBoxItem from "./DateBoxItem";
import { CarouselNextButton, CarouselPrevButton } from "./CarouselButton";
import { generateDates, getDates, getDate } from "../../store/dates";
import "swiper/css";
import "swiper/css/navigation";
import "./Reservation.scss";
import "./CarouselButton.scss";

const Reservation = () => {
	const dispatch = useDispatch();

	const dates = useSelector(getDates());

	useEffect(() => {
		dispatch(generateDates());
	}, [dispatch]);

	const [startDate, setStartDate] = useState(null);
	const [inDate, setInDate] = useState(false);
	const [outDate, setOutDate] = useState(false);
	const [selectedDates, setSelectedDates] = useState([]);

	const handleClick = (e, date) => {
		e.preventDefault();

		if (inDate && outDate) {
			setInDate(false);
			setOutDate(false);
			const selectedDates = document.querySelectorAll(".selected-date");
			selectedDates.forEach((date) => {
				date.classList.remove("selected-date");
			});
			setSelectedDates([]);
		} else if (!inDate) {
			setInDate(true);
			e.target.classList.add("selected-date");

			setSelectedDates([...selectedDates, date]);
		} else {
			if (
				parseInt(e.target.innerText) ===
				parseInt(document.querySelector(".selected-date").innerText)
			) {
				setOutDate(true);
				setSelectedDates([...selectedDates, date]);
			}

			if (
				parseInt(e.target.innerText) >
				parseInt(document.querySelector(".selected-date").innerText)
			) {
				setOutDate(true);
				setSelectedDates([...selectedDates, date]);
				e.target.classList.add("selected-date");

				const dateBoxes = document.querySelectorAll(".date-box-item");

				let count = 0;
				dateBoxes.forEach((dateBox) => {
					if (dateBox.classList.contains("selected-date")) {
						count++;
					}

					if (0 < count && count < 2) {
						dateBox.classList.add("selected-date");
					}
				});
			}
		}
	};

	return (
		<div className="carousel_wrapper">
			<div className="swiper-wrapper">
				<Swiper
					className="carousel-container__swiper"
					modules={[Navigation, A11y]}
					spaceBetween={2}
					slidesPerView={5}
					navigation={{
						nextEl: ".custom-next-button",
						prevEl: ".custom-prev-button",
					}}
				>
					{dates &&
						dates.map((date, i) => {
							return (
								<SwiperSlide key={i}>
									<DateBoxItem
										date={date}
										key={i}
										onClick={(e) => handleClick(e, date)}
									/>
								</SwiperSlide>
							);
						})}
				</Swiper>
				<div className="custom-nav-buttons">
					<CarouselPrevButton />
					<CarouselNextButton />
				</div>
			</div>

			<div className="star-end-date">
				<div className="set-date">
					<span>Start-date: </span>
					{inDate && (
						<div className="in-date">
							{<DateSelector selectedDate={selectedDates[0]} />}
						</div>
					)}
				</div>
				<div className="set-date">
				<span>End-date: </span>
				{outDate && (
					<div className="in-date">
						{<DateSelector selectedDate={selectedDates[1]} />}
					</div>
				)}
                </div>
			</div>

			<div className="reservation-button">
				<button disabled={!inDate || !outDate}>Reserve</button>
			</div>
		</div>
	);
};

export default Reservation;
