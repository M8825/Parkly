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
                    src="https://i.ibb.co/yN2jYP7/Screenshot-2023-02-23-at-10-39-27-PM.png"
                    // src="https://i.ibb.co/3f09T18/Screenshot-2023-02-23-at-10-44-17-PM.png"
					// src="https://scontent-lga3-2.xx.fbcdn.net/v/t31.18172-8/1053419_10201109093999816_275511605_o.jpg?_nc_cat=111&ccb=1-7&_nc_sid=de6eea&_nc_ohc=ifd2ceD69fwAX8wCwOd&_nc_ht=scontent-lga3-2.xx&oh=00_AfAKhJhfcF7Wgn_nkU-HBBH_JTjhg4XBnLxx_8JbONLplQ&oe=641FB5C2"
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
									Current Reservation
								</Tab>
								<Tab>Your spots</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
                                    <UserReservations />
								</TabPanel>
								<TabPanel>
									{/* <h1>FooBar from Current Reservation\</h1> */}
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
