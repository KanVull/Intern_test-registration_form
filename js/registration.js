$(function() {
    function clearErrors() {
        $('.error').text('').css('display', 'none');
    }

    function collectFormData(form) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((v, k) => {
            data[k] = v;
        });
        console.log(data)
        return data;
    }

    function setError(errorMessageElementID, errorMessage) {
        $('#' + errorMessageElementID).text(errorMessage).css('display', 'flex');
    }

    function validateField(value, validator, errorMessageElementID) {
        const error = validator(value);
        if (error) {
            setError(errorMessageElementID, error)
        }
        return !error;
    }

    function validateForm(data) {
        const fieldsToValidate = [
            { name: 'firstname', validator: validateFirstName, errorId: 'firstnameError' },
            { name: 'lastname', validator: validateLastName, errorId: 'lastnameError' },
            { name: 'emailphone', validator: validateEmailPhone, errorId: 'emailphoneError' },
            { name: 'birthdate', validator: validateBirthDate, errorId: 'birthdateError' },
            { name: 'password1', validator: validatePassword, errorId: 'password1Error' },
            { name: 'password2', validator: validateConfirmPassword, errorId: 'password2Error' }
        ];
    
        let isValid = true;
        fieldsToValidate.forEach(field => {
            isValid = validateField(data[field.name], field.validator, field.errorId) && isValid;
        });
    
        return isValid;
    }

    // Enable and disable Submit button accordingly Terms agree checkbox
    function checkButtonState() {
        $('#submitButton').prop(
            'disabled',
            !($('#checkTermsAgree').is(':checked'))
        );
    }

    // Event handler to clear error message when input field is focused
    $(document).on('focus', 'input', function() {
        $(this).siblings('.error').text('').css('display', 'none');
    });

    $(document).on('change', '#checkTermsAgree', function() {
        checkButtonState();
    });

    $('.pr-password').passwordRequirements({
        numCharacters: 8,
        useLowercase: true,
        useUppercase: true,
        useNumbers: true,
        useSpecial: true,
    });

    $('#registrationForm').submit(function(e) {
        clearErrors();

        formData = collectFormData(this);
        formValid = validateForm(formData)
        if (!formValid) {
            //
        } else {
            console.log('Succsess');
        }
        e.preventDefault();
    });
});