// create react component with ES fat arrow syntax and export it as default
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const CarouselNextButton = (props) => {
	return (
		<button className="custom-next-button btnn">
            <FontAwesomeIcon icon={faChevronRight} className="btn__icon"/>
		</button>
	);
};

export const CarouselPrevButton = (props) => {
	return (
		<button className="custom-prev-button btnn">
            <FontAwesomeIcon icon={faChevronLeft} className="btn__icon" />
		</button>
	);
};
