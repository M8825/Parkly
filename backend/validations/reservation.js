const {check} = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');


const validateReservation = [
    check('startDate')
        .exists({checkFalsy: true})
        .withMessage('startDate must exist'),
    check('endDate')
        .exists({checkFalsy: true})
        .withMessage('endDate must exist'),
    handleValidationErrors
];