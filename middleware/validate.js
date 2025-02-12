const validator = require('validator');

const saveContact = (req, res, next) => {
    console.log("Received Request Body:", req.body); // Debugging

    const { firstName, lastName, email, favouriteColour, birthday, school, status } = req.body;
    let errors = {};

    // Function to validate required string fields
    const validateRequiredField = (field, fieldName) => {
        if (!field || typeof field !== 'string' || !field.trim()) {
            errors[fieldName] = [`${fieldName} is required and must be a string.`];
        }
    };

    // Validate required fields
    validateRequiredField(firstName, "firstName");
    validateRequiredField(lastName, "lastName");
    validateRequiredField(school, "school");
    validateRequiredField(status, "status");

    // Email validation
    if (email) {
        if (!validator.isEmail(email)) {
            errors.email = ["email must be a valid email address."];
        }
    } else {
        errors.email = ["email is required."];
    }

    // Validate optional fields only if provided
    if (birthday && typeof birthday !== 'string') {
        errors.birthday = ["birthday must be a string."];
    }
    if (favouriteColour && typeof favouriteColour !== 'string') {
        errors.favouriteColour = ["favouriteColour must be a string."];
    }

    // Return errors if any exist
    if (Object.keys(errors).length > 0) {
        console.log("Validation Errors:", errors);
        return res.status(412).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};

module.exports = { saveContact };
