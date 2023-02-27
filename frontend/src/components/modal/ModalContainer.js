import React from "react";
import { useState } from "react";
import SessionButton from "./ProfileButton";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unauthorizedReservation } from "../../store/reservations";

import "./ModalContainer.scss";

const ModalContainer = (props) => {
	const dispatch = useDispatch();
	const { listingId } = useParams();
	let [popup, setPopup] = useState({ isShown: false });

	const showModal = () => {
		setPopup({ isShown: true });
		toggleScrollLock();
		if (props.reservation) {
			dispatch(unauthorizedReservation(props.reservation));
		}
	};

	const closeModal = () => {
		setPopup({ isShown: false });
		toggleScrollLock();
		// props.onClose();
	};

	// On click outside of modal, close modal if user clicks
	// outside of modal. If user clicks inside modal, do nothing.
	// Modal box is located in another div with class name "modal-cover"
	// when user clicks modal container, we close modal.
	const onClickOutside = (event) => {
		if (event.target.className === "modal-container") {
			closeModal();
			// props.onClose();
		}
	};

	const toggleScrollLock = () => {
		document.querySelector("html").classList.toggle("scroll-lock");
	};

	return (
		<>
			{listingId ? (
				<>
					<Modal
						closeModal={closeModal}
						onClickOutside={onClickOutside}
						modalAreaStyling={props.modalAreaStyling}
					>
						{props.children}
					</Modal>
				</>
			) : (
				<div>
					<SessionButton
						showModal={showModal}
						triggerText={"Sign in"}
					/>
					{popup.isShown ? (
						<Modal
							closeModal={closeModal}
							onClickOutside={onClickOutside}
							modalAreaStyling={props.modalAreaStyling}
						>
							{props.children}
						</Modal>
					) : null}
				</div>
			)}
		</>
	);
};

export default ModalContainer;
