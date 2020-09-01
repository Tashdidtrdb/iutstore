const { body, validationResult } = require('express-validator');

const validationRules = () => {
    return [
        body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
        body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        next();
    } else {
        const extractedErrors = []
        errors.array().map(error => extractedErrors.push({ [error.param]: error.msg }));

        error = new Error();
        error.message = extractedErrors;
        error.statusCode = 422;
        next(error);
    }
}

module.exports = { validationRules, validate };
