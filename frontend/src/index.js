import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getLocation() {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    return { lat: latitude, lng: longitude };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function startApp() {
  const userLocation = await getLocation();
  const initialState = {
    session: {userLocation: userLocation},
    // add other initial state properties here
  };
  const store = configureStore(initialState);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

startApp();
