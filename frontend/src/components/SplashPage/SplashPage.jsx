import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserZip } from "../../store/session";
import { fetchSpots, getSpots } from "../../store/spots";

import Map from "../Map/Map";
import "./SplashPage.css";

function SplashPage() {
	const dispatch = useDispatch();

	const spots = useSelector(getSpots())
	const userZip = useSelector(getUserZip);

	useEffect(() => {
		if (userZip) {
			dispatch(fetchSpots([userZip]));
		}
	}, [dispatch, userZip]);

	return (
		spots.length > 0  && (
			<div className="splash-page">
				{/* <Navigation/> */}
				<div className="splash-page-bg">
					<div className="content-wrapper">
						<div className="left-side">
							<Map spots={spots} />
						</div>
						<div className="right-side">
							<div className="park-with-us">
								<h2>Most Convenient Parking in NY/NJ Area.</h2>
								{/* TODO: not for production it doesn't go anywhere */}
								<button className="btn start-btn" type="submit">
									<NavLink to="/index">Get started</NavLink>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export default SplashPage;
