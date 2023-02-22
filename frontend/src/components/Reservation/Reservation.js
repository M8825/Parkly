import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
// import { CarouselNextButton, CarouselPrevButton } from "./CarouselButton";

import DateBoxItem from "./DateBoxItem";
import "./Reservation.scss";

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
        <div className="date-box-item-wrapper" >
            {
                getDatesForTwoWeeks().map((date, i) => {
                    return <DateBoxItem date={date} key={i} />
                })
            }
        </div>

    )
};

export default Reservation;
