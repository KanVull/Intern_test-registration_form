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
    const phoneRegex = /^(?:\+?\d{1,3}\s?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
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
    if (!validateEmail(value) && !validatePhone(value)) {
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

    // Regular expression for validating Latin symbols, at least one number,
    // one uppercase symbol, and one special symbol
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;

    if (!passwordRegex.test(value)) {
        return `Password must:
        - contain at least one digit,
        - one uppercase letter,
        - one special symbol,
        - consist of Latin symbols.`;
    }

    return ''
}

function validateConfirmPassword(password, confirmPassword) {
    // returns Error message if validation failed
    // overwise returns empty string
    if (confirmPassword.trim() === '') {
        return 'Confirm password is required.';
    }

    if (password !== confirmPassword) {
        return 'Passwords do not match.';
    }

    return ''
}