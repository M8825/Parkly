var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const User = mongoose.model('User');
const Spot = mongoose.model('Spot');


/* GET users listing. */
router.get('/', function(req, res, next) {
 res.json({
    message: "GET /api/users + foo"
  });
});

// POST /api/users/register
router.post('/register', validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.phoneNumber === req.body.phoneNumber) {
      errors.phoneNumber = "A user has already registered with this phone number";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        // return res.json({ user });
        return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE

      }
      catch(err) {
        next(err);
      }
    })
  });
});

// POST /api/users/login
router.post('/login', validateLoginInput, async (req, res, next) => {

  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    // return res.json({ user });
    return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    phoneNumber: req.user.phoneNumber
  });
});

router.get('/spots/:userId', async function(req, res) {
  console.log(req.params)
  const spots = await Spot.find({owner: req.params.userId})
  res.json(spots);
});


module.exports = router;
