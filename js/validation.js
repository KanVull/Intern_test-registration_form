/**
 * Validates the first name field.
 * @param {string} value - The value of the first name input field.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
function validateFirstName(value) {
    if (value.trim() === '') {
        return 'First name is required.';
    }
    if (!/^[a-zA-Z]+$/.test(value)) {
        return 'First name must contain only Latin characters.';
    }
    return '';
}

/**
 * Validates the last name field.
 * @param {string} value - The value of the last name input field.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
function validateLastName(value) {
    if (value.trim() === '') {
        return 'Last name is required.';
    }
    if (!/^[a-zA-Z]+$/.test(value)) {
        return 'Last name must contain only Latin characters.';
    }
    return '';
}

/**
 * Validates the email field.
 * @param {string} value - The value of the email input field.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
function validateEmail(value) {
    if (value.trim() === '') {
        return 'Email is required.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
        return 'Invalid email format.'
    }
    return ''
}

/**
 * Validates the phone number field.
 * @param {string} value - The value of the phone number input field.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
function validatePhone(value) {
    if (value.trim() === '') {
        return 'Phone is required.';
    }
    const phoneRegex = /^([\+][0-9]{1,3}[\s]?)?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{2,3}[-\s\.]?[0-9]{2,3}$/;
    if (!phoneRegex.test(value)) {
        return 'Invalid phone format.'
    }
    return ''
}

/**
 * Validates the email or phone number field.
 * @param {string} value - The value of the email or phone number input field.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
function validateEmailPhone(value) {
    if (value.trim() === '') {
        return 'Email or phone is required.';
    }

    if (validateEmail(value) && validatePhone(value)) {
        return 'Invalid email or phone format.'
    }
    return ''
}

/**
 * Validates the birth date field.
 * @param {string} value - The value of the birth date input field.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
function validateBirthDate(value) {
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

/**
 * Validates the password field.
 * @param {string} value - The value of the password input field.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
function validatePassword(value) {
    if (value.trim() === '') {
        return 'Password is required.';
    }

    // Regular expression for validating passwords:
    // - At least 8 characters long
    // - Contains at least one lowercase letter
    // - Contains at least one uppercase letter
    // - Contains at least one digit
    // - Contains at least one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(value)) {
        return 'Password doesn\'t meet rules.';
    }

    return ''
}

/**
 * Validates the confirmation of the password.
 * @param {string} password - The password to be confirmed.
 * @param {string} confirmPassword - The confirmation of the password.
 * @returns {string} An error message if validation fails, otherwise an empty string.
 */
function validateConfirmPassword(password, confirmPassword) {
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