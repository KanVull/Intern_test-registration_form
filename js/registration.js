/**
 * Clears and hide .error objects displayed next to form input fields.
 */
function clearErrors() {
    $('.error').text('').css('display', 'none');
}

/**
 * Collects form data into a JavaScript object.
 * @param {HTMLFormElement} form - The form element to collect data from.
 * @returns {Object} - An object containing form field names and their corresponding values.
 */
function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    return data;
}

/**
 * Sets an error message and displays it next to a specified element.
 * @param {string} errorMessageElementID - The ID of the HTML element where the error message will be displayed.
 * @param {string} errorMessage - The error message to be displayed.
 */
function setError(errorMessageElementID, errorMessage) {
    $('#' + errorMessageElementID).text(errorMessage).css('display', 'flex');
}

/**
 * Validates a single form field using a specified validation function.
 * @param {string} value - The value of the form field to be validated.
 * @param {Function} validator - The validation function to be applied to the field value.
 * @param {string} errorMessageElementID - The ID of the HTML element where error messages will be displayed.
 * @returns {boolean} - True if the field passes validation, false otherwise.
 */
function validateField(value, validator, errorMessageElementID) {
    const error = validator(value);
    if (error) {
        setError(errorMessageElementID, error);
        return false;
    }
    return true;
}

/**
 * Validates the entire form by validating each individual field.
 * @param {Object} data - An object containing form field names and their corresponding values.
 * @returns {boolean} - True if all fields pass validation, false otherwise.
 */
function isFormValid(data) {
    const fieldsToValidate = [
        { name: 'firstname', validator: validateFirstName, errorId: 'firstnameError' },
        { name: 'lastname', validator: validateLastName, errorId: 'lastnameError' },
        { name: 'emailphone', validator: validateEmailPhone, errorId: 'emailphoneError' },
        { name: 'birthdate', validator: validateBirthDate, errorId: 'birthdateError' },
        { name: 'password1', validator: validatePassword, errorId: 'password1Error' }
    ];

    let isValid = true;
    fieldsToValidate.forEach(field => {
        isValid = validateField(data[field.name], field.validator, field.errorId) && isValid;
    });

    const confirmPasswordError = validateConfirmPassword(data['password1'], data['password2']);
    if (confirmPasswordError) {
        setError('password2Error', confirmPasswordError);
        isValid = false;
    }

    return isValid;
}

/**
 * Enables or disables the #submitButton based on the state of a #checkTermsAgree checkbox.
 */
function checkButtonState() {
    $('#submitButton').prop('disabled', !$('#checkTermsAgree').is(':checked'));
}

/**
 * Event handler to clear .error elements when an input field is focused.
 */
$(document).on('focus', 'input', function() {
    $(this).siblings('.error').text('').css('display', 'none');
});

/**
 * This event handler adds a class 'clicked' to the input field with the ID 
 * 'inputBirthDate' when it is focused, if the class is not already present.
 */
$(document).on('focus', '#inputBirthDate', function () {
    if (!$(this).hasClass('clicked')) {
        $(this).addClass('clicked');
    }
});

/**
 * Event handler for focusing on password input fields.
 * It displays the toggle-password button next to the focused password input field.
 */
$(document).on('focus', '.password', function () {
    $(this).siblings('.toggle-password').css('display', 'block');
});

/**
 * Event handler for toggling password visibility.
 * When the toggle-password button is clicked, it switches the 
 * password input field between visible and hidden states.
 */
$(document).on('click', '.toggle-password', function (e) {
    e.preventDefault();
    var target = $(this).siblings('.password');
    if (target.attr('type') === 'password') {
        target.attr('type', 'text');
        $(this).find('i').removeClass('bi-eye').addClass('bi-eye-slash');
    } else {
        target.attr('type', 'password');
        $(this).find('i').removeClass('bi-eye-slash').addClass('bi-eye');
    }
});

// Event handler for terms agreement checkbox
$(document).on('change', '#checkTermsAgree', function() {
    checkButtonState();
});

/**
 * Event handler for form submission.
 * It prevents! the default form submission behavior, clears any existing
 * error messages, gathers form data, validates the form,
 * and show success registration messege if valid.
 */
$(document).on('submit', '#registrationForm', function(e) {
    e.preventDefault();
    clearErrors();

    const formData = collectFormData(this);
    const formValid = isFormValid(formData);
    if (formValid) {
        formData['login-type'] = validateEmail(formData['emailphone']) ? 'phone' : 'email';
        console.log(formData)
        const message = document.getElementById('success')
        message.style.display = 'flex';
    }
});
