const {check} = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateSpotInput = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage('Address must exist'),

    check('size')
        .exists({checkFalsy: true})
        .withMessage('Size must exist'),
    check('zip')
        .isLength(5)
        .withMessage('Must be a valid zip code'),
    check('state')
        .isLength(2)
        .withMessage('Must be a state in the US'),
    check('title')
        .exists({checkFalsy: true})
        .withMessage('Spot must have title')
        .isLength({min: 5, max: 60})
        .withMessage('title must have no more than 60 characters'),
    check('description')
        .isLength({max: 400})
        .withMessage('description must have no more than 400 characters'),
    check('rate')
        .exists({checkFalsy: true})
        .withMessage('spot must have an hourly rate'),

    handleValidationErrors
];

module.exports = validateSpotInput;
