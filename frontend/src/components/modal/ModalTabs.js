import React from "react";
import tabListTheme from "./ModalTabsTheme";
import {
	ChakraProvider,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react";
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";
// import LoginForm from "../authentication/LoginForm";
// import NewAccountForm from "../authentication/NewAccountForm";
// import ModalWelcomeHeader from "../header/Welcome";

const ModalTabs = ({ closeModal }) => {
	return (
		<ChakraProvider theme={tabListTheme}>
			<Tabs>
				<TabList
					borderBottom={"1px solid "}
					borderColor={"rgb(209 209 213)"}
				>
					<Tab className="form-tab">Log In</Tab>
					<Tab>Sign Up</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<LoginForm />
						{/* <LoginForm closeModalFunc={closeModal} /> */}
					</TabPanel>
					<TabPanel>
						<SignupForm />
						{/* <NewAccountForm closeModalFunc={closeModal} /> */}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</ChakraProvider>
	);
};

export default ModalTabs;
