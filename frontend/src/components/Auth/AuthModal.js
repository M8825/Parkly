import ModalContainer from "../modal/ModalContainer";
import ModalTabs from "../modal/ModalTabs"


const AuthModal = ({ reservation }) => {
    const modalAreaStyling = {
        backgroundColor: "#faf9f8",
        borderRadius: "20px",
        color: "#0C1059",
        width: "550px",
        height: "750px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      };

	return (
		<>
			<ModalContainer modalAreaStyling={modalAreaStyling} reservation={reservation}>
        <ModalTabs />
			</ModalContainer>
		</>
	);
};

export default AuthModal;
