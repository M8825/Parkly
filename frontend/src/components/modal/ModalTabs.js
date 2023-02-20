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
					<Tab className="form-tab">Sign in</Tab>
					<Tab>New Account</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<LoginForm />
						{/* <LoginForm closeModalFunc={closeModal} /> */}
					</TabPanel>
					<TabPanel>
						<h1>SignupForm</h1>
						{/* <NewAccountForm closeModalFunc={closeModal} /> */}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</ChakraProvider>
	);
};

export default ModalTabs;
