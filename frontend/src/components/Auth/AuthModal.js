import ModalContainer from "../modal/ModalContainer";
import SignUp from "./SignupForm";
import ModalTabs from "../modal/ModalTabs"


const AuthModal = () => {
    const modalAreaStyling = {
        backgroundColor: "#faf9f8",
        borderRadius: "20px",
        color: "#0C1059",
        width: "500px",
        height: "650px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
      };

	return (
		<>
			<ModalContainer modalAreaStyling={modalAreaStyling}>
				{/* <SignUp /> */}
        <ModalTabs />
			</ModalContainer>
		</>
	);
};

export default AuthModal;
