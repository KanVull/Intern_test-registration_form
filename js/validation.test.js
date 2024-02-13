const {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePhone,
    validateEmailPhone,
    validateBirthDate,
    validatePassword,
    validateConfirmPassword,
} = require('./validation');

describe('Validation Functions', () => {
    describe('validateFirstName', () => {
        test('should return error message for empty value', () => {
            expect(validateFirstName('')).toBe('First name is required.');
        });

        test('should return error message for non-Latin characters', () => {
            const wrongNonEmptyInputs = [
                '123',
                'Roman-',
                '.',
                '@gmail.com',
            ]
            wrongNonEmptyInputs.forEach(value => {
                expect(validateFirstName(value)).toBe('First name must contain only Latin characters.');
            });
        });

        test('should return empty string for valid first name', () => {
            const validFirstNames = [
                'George',
                'alexey',
            ];
            validFirstNames.forEach(firstname => {
                expect(validateFirstName(firstname)).toBe('');
            });
        });
    });

    describe('validateLastName', () => {
        test('should return error message for empty value', () => {
            expect(validateLastName('')).toBe('Last name is required.');
        });

        test('should return error message for non-Latin characters', () => {
            const wrongNonEmptyInputs = [
                '123',
                'Doe-',
                '.',
                '@example.com',
            ];
            wrongNonEmptyInputs.forEach(value => {
                expect(validateLastName(value)).toBe('Last name must contain only Latin characters.');
            });
        });

        test('should return empty string for valid last name', () => {
            const validLastNames = [
                'George',
                'alexey',
            ];
            validLastNames.forEach(lastname => {
                expect(validateLastName(lastname)).toBe('');
            });
        });
    });

    describe('validateEmail', () => {
        test('should return error message for empty value', () => {
            expect(validateEmail('')).toBe('Email is required.');
        });

        test('should return error message for invalid email format', () => {
            const invalidEmails = [
                'example',
                'example@',
                'example.com',
                '@example.com',
                'example@com',
            ];
            invalidEmails.forEach(email => {
                expect(validateEmail(email)).toBe('Invalid email format.');
            });
        });

        test('should return empty string for valid email format', () => {
            const validEmails = [
                'example@example.com',
                'user123@example.com',
                'user.name@example.co.uk',
            ];
            validEmails.forEach(email => {
                expect(validateEmail(email)).toBe('');
            });
        });
    });

    describe('validatePhone', () => {
        test('should return error message for empty value', () => {
            expect(validatePhone('')).toBe('Phone is required.');
        });

        test('should return error message for invalid phone format', () => {
            const invalidPhones = [
                '123456', // Incomplete number
                '+1', // Incomplete number
                '+12345678901234567', // Too long
                'invalid', // Non-numeric characters
            ];
            invalidPhones.forEach(phone => {
                expect(validatePhone(phone)).toBe('Invalid phone format.');
            });
        });

        test('should return empty string for valid phone format', () => {
            const validPhones = [
                '88005553535',
                '+11234567890',
                '+1 (123) 456-7890',
                '+44 20 1234 5678',
            ];
            validPhones.forEach(phone => {
                expect(validatePhone(phone)).toBe('');
            });
        });
    });

    describe('validateEmailPhone', () => {
        test('should return error message for empty value', () => {
            expect(validateEmailPhone('')).toBe('Email or phone is required.');
        });

        test('should return error message for invalid email or phone format', () => {
            const invalidInputs = [
                'invalid', // Neither email nor phone format
                '12345678', // Invalid phone format
                'invalid@example', // Invalid email format
            ];
            invalidInputs.forEach(input => {
                expect(validateEmailPhone(input)).toBe('Invalid email or phone format.');
            });
        });

        test('should return empty string for valid email or phone format', () => {
            const validInputs = [
                'example@example.com',
                '+11234567890',
                '+1 (123) 456-7890',
            ];
            validInputs.forEach(input => {
                expect(validateEmailPhone(input)).toBe('');
            });
        });
    });

    describe('validateBirthDate', () => {
        test('should return error message for empty value', () => {
            expect(validateBirthDate('')).toBe('Birthday is required.');
        });

        test('should return error message for invalid date format', () => {
            const wrongDates = [
                '2022-01-32',
                '32-01-2022',
                '3000102100',
                'invalid',
            ]

            wrongDates.forEach(date => {
                expect(validateBirthDate(date)).toBe('Invalid birthday format.');
            });
        });

        test('should return error message for future birth date', () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1); // Set to next year
            const futureDateString = futureDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
            expect(validateBirthDate(futureDateString)).toBe('Birthday must be in the past.');
        });

        test('should return empty string for valid birth date', () => {
            expect(validateBirthDate('2000-01-01')).toBe('');
            expect(validateBirthDate('1990-12-31')).toBe('');
        });
    });

    describe('validatePassword', () => {
        test('should return error message for empty value', () => {
            expect(validatePassword('')).toBe('Password is required.');
        });

        test('should return error message for password not meeting rules', () => {
            const invalidPasswords = [
                'Pass1!',       // Less than 8 symbols
                'password',     // No special characters
                'password!',    // No uppercase characters
                'PASSWORD1',    // No lowercase characters
                'pass1!',       // No uppercase characters
                'PassWord',     // No special characters
                '12345678',     // No letters
                '!@#$%^&*',     // No letters or digits
            ];
            invalidPasswords.forEach(password => {
                expect(validatePassword(password)).toBe('Password doesn\'t meet rules.');
            });
        });

        test('should return empty string for valid password', () => {
            const validPasswords = [
                'Password1!',
                'P@ssw0rd',
                'SecurePassword123!@#',
            ];
            validPasswords.forEach(password => {
                expect(validatePassword(password)).toBe('');
            });
        });
    });

    describe('validateConfirmPassword', () => {
        test('should return error message if passwords do not match', () => {
            expect(validateConfirmPassword('password1', 'password2')).toBe('Passwords do not match.');
            expect(validateConfirmPassword('password', 'PASSWORD')).toBe('Passwords do not match.');
        });

        test('should return empty string if passwords match', () => {
            expect(validateConfirmPassword('password', 'password')).toBe('');
            expect(validateConfirmPassword('P@ssw0rd', 'P@ssw0rd')).toBe('');
        });
    });
});