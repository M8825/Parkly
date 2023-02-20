import ModalContainer from "../modal/ModalContainer";
import SignUp from "../Auth/Signup";

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
				<SignUp />
			</ModalContainer>
		</>
	);
};

export default AuthModal;
