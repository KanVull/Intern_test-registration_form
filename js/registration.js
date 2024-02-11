$(function() {
    // Function to clear error messages and hide error spans
    function clearErrors() {
        $('.error').text('').css('display', 'none');
    }

    // Hide error spans when page was loaded
    clearErrors();

    // Event handler to clear error message when input field is focused
    $(document).on('focus', 'input', function() {
        $(this).siblings('.error').text('').css('display', 'none');
    });

    // Enable and disable Submit button accordingly Terms agree checkbox
    function checkButtonState() {
        if ($('#checkTermsAgree').is(':checked')) {
            $('#submitButton').prop('disabled', false);
        } else {
            $('#submitButton').prop('disabled', true);
        }
    }

    $(document).on('change', '#checkTermsAgree', function() {
        checkButtonState();
    });
});