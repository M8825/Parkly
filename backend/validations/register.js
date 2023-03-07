// validations/register.js
const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateRegisterInput is a combination Express middleware that uses the
// `check` middleware to validate the keys in the body of a request to
// register a user
const validateRegisterInput = [
  check('email')
    .notEmpty()
    .withMessage('Cannot be left blank')
    .isEmail()
    .withMessage('Email is invalid'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Cannot be left blank')
    .isLength({ min: 2, max: 15 })
    .withMessage('First name must be between 2 and 30 characters'),
  check('lastName')
    .notEmpty()
    .withMessage('Cannot be left blank')
    .isLength({min: 2, max: 15 })
    .withMessage('Last name must be between 2 and 30 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Cannot be left blank')
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),

  check('phoneNumber')
    .exists({checkFalsy: true})
    .withMessage('Cannot be left blank')
    .custom((val) => { return val.toString().length === 10 })
    .withMessage('Phone number must be a valid phone number'),
  handleValidationErrors
];

module.exports = validateRegisterInput;
