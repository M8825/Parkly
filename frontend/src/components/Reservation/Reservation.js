import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
// import { CarouselNextButton, CarouselPrevButton } from "./CarouselButton";

import DateBoxItem from "./DateBoxItem";
import { CarouselNextButton, CarouselPrevButton } from "./CarouselButton";
import "swiper/css";
import "swiper/css/navigation";
import "./Reservation.scss";
import "./CarouselButton.scss"

const Reservation = () => {

    const getDatesForTwoWeeks = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          dates.push(date);
        }

        return dates;
      }


    return (
        <div className="carousel_wrapper">
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
            { getDatesForTwoWeeks().map((date, i) => {
                    return (
                        <SwiperSlide key={i}>
                             <DateBoxItem date={date} key={i} />
                        </SwiperSlide>
                    );
                })}
        </Swiper>
        <div className="custom-nav-buttons">
				<CarouselPrevButton />
				<CarouselNextButton />
		</div>
        </div>
    )
};

export default Reservation;
