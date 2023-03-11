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
	const userCoordinates = await getLocation();
	const userZip = await getZipCode(userCoordinates);

	// Setup initial state with user coordinates and zip code
	const initialState = {
		session: {
			userCoordinates,
			userZip,
		},
	};

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
