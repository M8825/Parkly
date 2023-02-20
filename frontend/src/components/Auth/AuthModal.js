import ModalContainer from "../modal/ModalContainer";
import SignUp from "./SignupForm";
import ModalTabs from "../modal/ModalTabs"


const AuthModal = () => {
    const modalAreaStyling = {
        backgroundColor: "green",
        width: "500px",
        height: "500px",
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
