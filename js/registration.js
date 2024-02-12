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
            { name: 'password1', validator: validatePassword, errorId: 'password1Error' }
        ];
    
        let isValid = true;
        fieldsToValidate.forEach(field => {
            isValid = validateField(data[field.name], field.validator, field.errorId) && isValid;
        });
    
        confirmPasswordError = validateConfirmPassword(data['password1'], data['password2'])
        if (confirmPasswordError) {
            setError('password2Error', confirmPasswordError);
            isValid = false;
        }

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

    $('#inputBirthDate').focus(function () {
        if (!$(this).hasClass('clicked')) {
            $(this).addClass('clicked');
        }
    });
    
    $('.pr-password').passwordRequirements({
        numCharacters: 8,
        useLowercase: true,
        useUppercase: true,
        useNumbers: true,
        useSpecial: true,
    });
    
    $('.password').focus(function () {
        $(this).siblings('.toggle-password').css('display', 'block');
    });

    $('.toggle-password').click(function (e) {
        var target = $(this).siblings('.password');
        if (target.attr('type') === 'password') {
            target.attr('type', 'text');
            $(this).find('i').removeClass('bi-eye').addClass('bi-eye-slash');
        } else {
            target.attr('type', 'password');
            $(this).find('i').removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });

    $(document).on('change', '#checkTermsAgree', function() {
        checkButtonState();
    });

    $('#registrationForm').submit(function(e) {
        e.preventDefault();
        clearErrors();

        formData = collectFormData(this);
        formValid = validateForm(formData)
        if (!formValid) {
            console.log('Bad form');
        } else {
            if (validateEmail(formData['emailphone'])) {
                formData['login-type'] = 'phone';
            } else {
                formData['login-type'] = 'email';
            }
            console.log(formData);
        }
    });
});