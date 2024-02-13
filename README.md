# Intern Test Registration Form

This project involves creating a simple HTML page with a form that allows users to sign up for an account.

## How to Run the Project

To run the project on your machine, follow these steps:

1. **Clone the Repository:** Start by cloning the repository to your local machine using Git. Run the following command in your terminal:
   ```
   git clone https://github.com/your-username/your-repository.git
   ```
2. **Navigate to the Project Directory:** Move into the project directory using the cd command:
    ```
    cd your-repository
    ```
3. **Start a Local Server:** You can use any local server tool of your choice to serve the files. For example, if you have the Live Server extension installed in Visual Studio Code, you can right-click on the index.html file and select "Open with Live Server" to start a local server and view the application in your browser.

That's it! You should now have the project up and running on your local machine.

## Testing
The validation functions were thoroughly tested. Follow these steps to run the tests:

1. **Install Jest**: Run `npm install --save-dev jest` in your project directory.
2. **Install jsdom**: Run `npm install --save-dev jsdom`.
3. **Run Tests**: Once installed, run your tests using the command `npx jest`.

## Changes Made:
1. Changed the page title from "Login" to "Sign up".
2. Edited "mm/dd/yy" to "mm/dd/yyyy" for clarity.
3. Cleared the phone image by removing empty spaces.
4. Renamed the "Don't have an account yet?" link to "Already have an account?" to better reflect its purpose.
5. Bootstrap 5.3.2 was used, but its default blue color (#0d6efd) was replaced with a new color (#007AFF) generated using an SCSS script.
6. The design has been made responsive to screen sizes, ensuring usability on both desktop and mobile devices.
7. The color of the Google Sign-In button did not meet Google's branding guidelines, so a color from Figma was added and commented out in "gsi.css".
8. Centered the text "Create account" on the button.
9. The hover style for the "Create account" button was chosen based on the nearby Google button's recommended style.
10. Error messages were styled to match the overall page aesthetic. The color was chosen using a color palette generation website (coolors.co) based on the page's color scheme.
11. The success message for validation was styled consistently with the rest of the page.
12. Added the jQuery plugin "jquery.passwordRequirements" for password validation and set rules for password complexity.
13. Implemented a feature to toggle password visibility with the standard eye icon from Bootstrap.
14. Added validation for a field where users can input either a phone number or an email. An additional field, logintype, is added to the output JSON object based on the entered value type.
