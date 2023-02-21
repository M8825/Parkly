import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/session";
// import NavBar from "./components/NavBar/NavBar";
// import { AuthRoute } from "./components/Routes/Routes";
// import { Switch } from "react-router-dom";

import SplashPage from "./components/SplashPage/SplashPage";
import Navigation from "./components/Navigation/Navigation";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentUser()).then(() => setLoaded(true));
	}, [dispatch]);

	return (
		loaded && (
			<>
				<Navigation />
				<SplashPage />
			</>
		)
	);
}

export default App;
