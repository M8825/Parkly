import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/session";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { Switch, Route, useLocation } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import SplashPage from "./components/SplashPage/SplashPage";
import SpotsIndex from "./components/SpotsIndex/SpotsIndex";
import ContactUs from "./components/ContactUs/ContactUs";
import CreateSpotForm from "./components/Spot/CreateSpotForm";
import ShowPage from "./components/ShowPage/ShowPage";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
	const location = useLocation();
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (location.pathname.split("/")[1] !== "users") {
				document.body.style.overflowY = 'hidden';
		} else {
				document.body.style.overflowY = 'auto';
		}

		dispatch(fetchCurrentUser()).then(() => setLoaded(true));
	}, [dispatch, location]);

	return (
		<>
			<Navigation />
			<Switch>
				<AuthRoute exact path="/" component={SplashPage} />

				<Route exact path="/index" component={SpotsIndex} />
				<Route exact path="/contact" component={ContactUs} />
				<Route path="/spots/edit/:spotId" component={CreateSpotForm} />

				<ProtectedRoute
					exact
					path="/spots/create"
					component={CreateSpotForm}
				/>
				<Route exact path="/spots/:spotId" component={ShowPage} />

				<ProtectedRoute
					exact
					path="/users/:userId"
					component={UserProfile}
				/>
			</Switch>
		</>
	);
}

export default App;
