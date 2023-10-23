import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../store/session";
import {
	ChakraProvider,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react";
import UserProfileTabsTheme from "./UserProfileTabsTheme";
import UserReservations from "./UserReservations";
import UserSpots from "./UserSpots";

import "./UserProfile.scss";

const UserProfile = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) =>
		state && state.session ? state.session.user : null
	);

	useEffect(() => {
		dispatch(fetchCurrentUser());

	}, [dispatch]);

	return (
		user.firstName && (
			<div className="profile-container">
				<img
					className="profile-image"
					src={require("./demo_user.png")}
					alt="profile"
				/>
				<div className="profile-header">
					<h1>{`${user.firstName} ${user.lastName}`}</h1>
				</div>

				<div className="profile-tabs">
					<ChakraProvider theme={UserProfileTabsTheme}>
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
								<Tab className="form-tab">
									Reservations
								</Tab>
								<Tab>Spots</Tab>
							</TabList>
							<TabPanels>
								<TabPanel className="user_profile_tabpanel">
                  <UserReservations />
								</TabPanel>
								<TabPanel className="user_profile_tabpanel">
									<UserSpots />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</ChakraProvider>
				</div>
			</div>
		)
	);
};

export default UserProfile;
