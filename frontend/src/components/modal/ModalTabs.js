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

const ModalTabs = () => {
	return (
		<ChakraProvider theme={tabListTheme}>
			<Tabs>
				<TabList
					style={{
						display: "flex",
						justifyContent: "center",
						paddingTop: "15px",
					}}
					borderBottom={"1px solid "}
					borderColor={"#AEAEAE"}
				>
					<Tab className="form-tab">Log In</Tab>
					<Tab>Sign Up</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<LoginForm />
					</TabPanel>
					<TabPanel>
						<SignupForm />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</ChakraProvider>
	);
};

export default ModalTabs;
