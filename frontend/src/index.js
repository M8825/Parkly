import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import { getLocation, getZipCode } from "./utils/mapsUtils";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.scss";

async function startApp() {
	let userCoordinates;
	let userZip;

	if (sessionStorage.getItem("userLocation")) {
			const userLocation = JSON.parse(
				sessionStorage.getItem("userLocation")
			);

			userCoordinates = userLocation.session.userCoordinates;
			userZip = userLocation.session.userZip;
	} else {
		userCoordinates = await getLocation();
		userZip = await getZipCode(userCoordinates);
	}

	// Setup initial state with user coordinates and zip code
	const initialState = {
		session: {
			userCoordinates,
			userZip,
		},
	};

	sessionStorage.setItem("userLocation", JSON.stringify(initialState));

	// Initialize store with state that includes user coordinates and zip code
	const store = configureStore(initialState);

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
