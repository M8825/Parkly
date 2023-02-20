// import Map from "./components/Map/Map";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage/SplashPage";

function App() {
	return (
		<>
			<h1>Splash Page</h1>
      <SplashPage />

			{/* <Switch>
				<Route exec path="/" component={Map} />
			</Switch> */}
		</>
	);
}

export default App;
