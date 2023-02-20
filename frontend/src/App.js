import { Switch } from "react-router-dom";
// import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import { AuthRoute } from "./components/Routes/Routes";

import SplashPage from "./components/SplashPage/SplashPage";
// import AuthModal from "./components/Auth/AuthModal";


function App() {
	return (
		<>
			<NavBar />
			<Switch>
				<AuthRoute exact path='/' component={ SplashPage } />
			</Switch>

			{/* <Switch>
				<Route exec path="/" component={Map} />
			</Switch> */}
		</>
	);
}

export default App;
