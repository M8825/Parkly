import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import ModalCloseButton from "./ModalCloseButton";
// import ModalTabs from "./ModalTabs";
import "./Modal.scss";

export const Modal = (props) => {

	return ReactDOM.createPortal(
		<FocusTrap>
			<aside className="modal-container" onClick={props.onClickOutside}>
				<ModalCloseButton closeModal={props.closeModal} />
				<div className="modal-area" style={props.modalAreaStyling}>
					{props.children}
				</div>
			</aside>
		</FocusTrap>,
		document.body
	);
};

export default Modal;
