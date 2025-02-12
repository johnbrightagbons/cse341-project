const Validator = require('validatorjs');

const validator = (body, rules, customMessages = {}, callback) => {
    const validation = new Validator(body, rules, customMessages);

    if (validation.fails()) {
        callback(validation.errors.all(), false); // Ensures all validation errors are returned
    } else {
        callback(null, true);
    }
};

const saveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'string',
        birthday: 'string',
        school: 'string',
        status: 'string'

    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }
        next();
    });
};

module.exports = { saveContact };

module.exports = {
    saveContact
};