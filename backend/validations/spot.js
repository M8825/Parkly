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

    check('owner')
        .exists({checkFalsy: true})
        .withMessage('Spot must have an owner'),

    check('title')
        .exists({checkFalsy: true})
        .withMessage('Spot must have title')
        .isLength({max: 30})
        .withMessage('title must have no more than 30 characters'),
    check('description')
        .isLength({max: 300})
        .withMessage('description must have no more than 300 characters'),

        
    handleValidationErrors
]

module.exports = validateSpotInput;