import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import { getLocation, getZipCode } from "./utils/mapsUtils";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

async function startApp() {
	const userCoordinates = await getLocation();
	const userZip = await getZipCode();

	// Setup initial state with user coordinates and zip code
	const initialState = {
		session: {
			userCoordinates,
			userZip,
		},
	};

	const store = configureStore(initialState); // initialize store with state

	// React 18 style of rendering
	const root = ReactDOM.createRoot(document.getElementById("root"));
	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</React.StrictMode>
	);
}

startApp();
