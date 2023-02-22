import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/session";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { Switch } from "react-router-dom";

import SplashPage from "./components/SplashPage/SplashPage";
import Navigation from "./components/Navigation/Navigation";
import SpotsIndex from "./components/SpotsIndex/SpotsIndex";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentUser()).then(() => setLoaded(true));
	}, [dispatch]);

	return loaded && (
			<>
				{/* <Navigation /> */}
				<CreateSpotForm />
				{/* <Switch>
					<AuthRoute exact path="/" component={SplashPage} />

					<ProtectedRoute exact path="/index" component={SpotsIndex}/>
				</Switch>
			</>
		);

}

export default App;
