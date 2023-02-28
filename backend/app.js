// backend/app.js

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { isProduction } = require("./config/keys");
const cors = require("cors");
const csurf = require("csurf");
const debug = require("debug");

require("./models/User");
require("./models/Spot");
require("./models/Reservation");
require("./config/passport");

const passport = require("passport"); // <-- ADD THIS LINE
const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const spotsRouter = require("./routes/api/spots");
const reservationsRouter = require("./routes/api/reservations");
const app = express();

// Attach Express routers
app.use("/api/users", usersRouter); // update the path
app.use("/api/csrf", csrfRouter);
app.use("/api/spots", spotsRouter);
app.use("/api/reservations", reservationsRouter);

// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.statusCode = 404;
	next(err);
});

app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true,
		},
	})
);

app.use(logger("dev")); // log request components (URL/method) to terminal
app.use(express.json()); // parse JSON request body
app.use(express.urlencoded({ extended: false })); // parse urlencoded request body
app.use(cookieParser()); // parse cookies as an object on req.cookies

// ADD THIS SECURITY MIDDLEWARE
// Security Middleware
if (!isProduction) {
	// Enable CORS only in development because React will be on the React
	// development server (http://localhost:3000). (In production, the Express
	// server will serve the React files statically.)
	app.use(passport.initialize()); // TODO: maybe move this to the if statement below
	app.use(cors());
}

// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token

// app.use(
// 	csurf({
// 		cookie: {
// 			secure: isProduction,
// 			sameSite: isProduction && "Lax",
// 			httpOnly: true,
// 		},
// 	})
// );

const serverErrorLogger = debug("backend:error");

// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
	serverErrorLogger(err);
	const statusCode = err.statusCode || 500;
	res.status(statusCode);
	res.json({
		message: err.message,
		statusCode,
		errors: err.errors,
	});
});

// Serve static React build files statically in production
if (isProduction) {
	const path = require("path");
	// Serve the frontend's index.html file at the root route
	app.get("/", (req, res) => {
		res.cookie("CSRF-TOKEN", req.csrfToken());
		res.sendFile(
			path.resolve(__dirname, "../frontend", "build", "index.html")
		);
	});

	// Serve the static assets in the frontend's build folder
	app.use(express.static(path.resolve("../frontend/build")));

	// Serve the frontend's index.html file at all other routes NOT starting with /api
	app.get(/^(?!\/?api).*/, (req, res) => {
		res.cookie("CSRF-TOKEN", req.csrfToken());
		res.sendFile(
			path.resolve(__dirname, "../frontend", "build", "index.html")
		);
	});
}

module.exports = app;
