import React from "react";

const SessionButton = ({ showModal, triggerText }) => {
	return (
		<button className="btn logout-btn" onClick={showModal}>
			{triggerText}
		</button>
	);
};

export default SessionButton;
