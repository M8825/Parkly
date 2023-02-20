// import Map from "./components/Map/Map";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage/SplashPage";
import Navigation from "./components/Navigation/Navigation";

function App() {
	return (
		<>
		<Navigation />

      <SplashPage />

			{/* <Switch>
				<Route exec path="/" component={Map} />
			</Switch> */}
		</>
	);
}

export default App;
