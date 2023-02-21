const {check} = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateSpotInput = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage('Address must exist'),

    check('size')
        .exists({checkFalsy: true})
        .withMessage('Size must exist'),

    check('accessible')
        .exists({checkFalsy: true})
        .withMessage('accessibility status must be declared'),

    check('zip')
        .isLength(5)
        .withMessage('Must be a valid zip code'),
    
    check('state')
        .isLength(2)
        .withMessage('Must be a state in the US'),
    
    check('hourlyRate')
        .exists({checkFalsy: true })
        .custom((value) => {value >= 0})
        .withMessage('Rate cannot be negative'),
        
    handleValidationErrors
]

module.exports = validateSpotInput;