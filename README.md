
//////////////////////////////////////////

Project Setup and Usage

Prerequisites
1.Install Node.js on your system.

Application Flow
2.When you first open the app, it will route you to the Login Page.
   .If your email is not registered, you need to sign up first.

3.Sign Up
 .Register using a valid email address.

4.Login
 .After signing up, log in using your credentials.
 .During login, a token will be created and stored in cookies for authentication.

5.Routing and Token Validation
 .If a user is not logged in and tries to access other routes, they will be redirected back to the login page due to token validation.

6.Dashboard
 .Once logged in, users are routed to the Dashboard.
 .Data will be fetched and displayed in the Navbar and Headers.

7.Recommended Jobs
 .You can add new jobs here.
 .These jobs will then be fetched and displayed on the Dashboard.

8.Application Status
 .Accessible via the header route /application.
 .This is a static design page showing the application status.

9.Logout
 .There is a Logout button in the Navbar.
 .Clicking it will log out the user and delete the token from cookies.

Additional Features
 .React-Toast: Used to show success and error messages.
 .Loading GIF: Added to enhance user experience during data fetches.
 .Cookies: Used to securely store authentication tokens.


//////////////////
Attached screenshots
<img width="1888" height="1031" alt="Image" src="https://github.com/user-attachments/assets/3e3ba8c5-9399-4194-be12-98cc33097989" />
<img width="1887" height="983" alt="Image" src="https://github.com/user-attachments/assets/b7351fac-caab-4c44-a051-4b6a5359d122" />
<img width="1902" height="983" alt="Image" src="https://github.com/user-attachments/assets/2c951e2a-1629-450e-8af3-d9288320d68e" />
<img width="1885" height="981" alt="Image" src="https://github.com/user-attachments/assets/cf8c532f-59f4-455f-a033-6a4292b1f419" />
<img width="1886" height="981" alt="Image" src="https://github.com/user-attachments/assets/b74158c0-43c8-411b-bf9f-6ea8749f3d1d" />
