import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import logger from 'redux-logger';
import thunk from "redux-thunk";
import geocodeReducer from "./geocodeReducer";
import session from "./session";
import errors from "./errors";
import spots from "./spots";
import dates from "./dates";
import reservations from "./reservations";

const rootReducer = combineReducers({
	geocode: geocodeReducer,
	errors,
	session,
	spots,
	dates,
	reservations,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
