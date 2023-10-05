import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import configureStore from "./store/store";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { getLocation, getZipCode } from "./utils/mapsUtils";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.scss";

const SESSION_STORAGE_KEY = "userLocation";

function setUserLocationToSession(data) {
	sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
}

function getUserLocationFromSession() {
	const storedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
	return storedData ? JSON.parse(storedData) : null;
}
async function startApp() {
	let userCoordinates;
	let userZip;
	const storedUserLocation = getUserLocationFromSession();

	if (storedUserLocation) {
			userCoordinates = storedUserLocation.session.userCoordinates;
			userZip = storedUserLocation.session.userZip;
	} else {
		try {
			userCoordinates = await getLocation();
			userZip = await getZipCode(userCoordinates);
		} catch (error) {
			console.error("Error getting user location: ", error);
			return;
		}
	}

	// Setup initial state with user coordinates and zip code
	const initialState = {
		session: {
			userCoordinates,
			userZip,
		},
	};
	setUserLocationToSession(initialState)

	// Initialize store with state that includes user coordinates and zip code
	const store = configureStore(initialState);

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
