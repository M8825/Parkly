import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/session";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { Switch } from "react-router-dom";

import SplashPage from "./components/SplashPage/SplashPage";
import Navigation from "./components/Navigation/Navigation";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentUser()).then(() => setLoaded(true));
	}, [dispatch]);

	return loaded && (
			<>
				<Navigation />
				<Switch>
					<AuthRoute exact path="/" component={SplashPage} />


					<ProtectedRoute exact path="/index" component={SplashPage}/>
				</Switch>
			</>
		);

}

export default App;
