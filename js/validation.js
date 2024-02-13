function validateFirstName(value) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (value.trim() === '') {
        return 'First name is required.';
    }
    if (!/^[a-zA-Z]+$/.test(value)) {
        return 'First name must contain only Latin characters.';
    }
    return '';
}

function validateLastName(value) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (value.trim() === '') {
        return 'Last name is required.';
    }
    if (!/^[a-zA-Z]+$/.test(value)) {
        return 'Last name must contain only Latin characters.';
    }
    return '';
}

function validateEmail(value) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (value.trim() === '') {
        return 'Email is required.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
        return 'Invalid email format.'
    }
    return ''
}

function validatePhone(value) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (value.trim() === '') {
        return 'Phone is required.';
    }
    const phoneRegex = /^([\+][0-9]{1,3}[\s]?)?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{2,3}[-\s\.]?[0-9]{2,3}$/;
    if (!phoneRegex.test(value)) {
        return 'Invalid phone format.'
    }
    return ''
}

function validateEmailPhone(value) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (value.trim() === '') {
        return 'Email or phone is required.';
    }

    if (validateEmail(value) && validatePhone(value)) {
        return 'Invalid email or phone format.'
    }
    return ''
}

function validateBirthDate(value) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (!value.trim()) {
        return 'Birthday is required.';
    }

    const birthdayDate = new Date(value);

    if (isNaN(birthdayDate.getTime())) {
        return 'Invalid birthday format.';
    }

    // Check if the birthday is in the past
    const today = new Date();
    if (birthdayDate >= today) {
        return 'Birthday must be in the past.';
    }

    return '';
}

function validatePassword(value) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (value.trim() === '') {
        return 'Password is required.';
    }

    // Regular expression for validating Latin symbols, 8 symbols minimum, at least one number,
    // one uppercase symbol, one lowercase symbol and one special symbol
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(value)) {
        return 'Password doesn\'t meet rules.';
    }

    return ''
}

function validateConfirmPassword(password, confirmPassword) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (password !== confirmPassword) {
        return 'Passwords do not match.';
    }

    return ''
}

// Exports for Jest unit testing

module.exports = { 
    validateFirstName: validateFirstName,
    validateLastName: validateLastName,
    validateEmail: validateEmail,
    validatePhone: validatePhone,
    validateEmailPhone: validateEmailPhone,
    validateBirthDate: validateBirthDate,
    validatePassword: validatePassword,
    validateConfirmPassword: validateConfirmPassword,
}