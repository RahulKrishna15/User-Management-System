# CodeTikki User Management System

A Node.js application built for the CodeTikki internship selection process. This user management system allows admins to add users and users to log in with their credentials.

## Features

- **Admin Functionality**:

  - Add new users with name, email, password, and role
  - View all registered users
  - Admin dashboard

- **User Authentication**:

  - Login system with email and password
  - Session management
  - JWT token-based authentication

- **User Dashboard**:

  - Personalized welcome message
  - Profile information display

- **Security**:

  - Password hashing using bcryptjs
  - JWT token-based authentication
  - Session management
  - Role-based access control

- **Database**:
  - MySQL integration for storing user records

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, bcryptjs, express-session
- **Frontend**: HTML, CSS, JavaScript

## Installation Instructions

1. **Clone the repository** (assuming you've created one)

   ```
   git clone <repository-url>
   cd codetikki-user-management
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Configure environment variables**

   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=3000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_mysql_password
     DB_NAME=codetikki_db
     JWT_SECRET=your_secret_key
     ```

4. **Set up MySQL database**

   - Make sure MySQL is installed and running
   - The application will automatically create the database and tables when started

5. **Start the application**

   ```
   npm start
   ```

   For development with auto-reload:

   ```
   npm run dev
   ```

6. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - Default admin credentials:
     - Email: admin@codetikki.com
     - Password: admin123

## Project Structure

```
project-structure/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Authentication and authorization middleware
├── models/          # Database models
├── public/          # Static assets (CSS, JS)
├── routes/          # API routes
├── views/           # HTML files
├── app.js           # Application entry point
├── package.json     # Project dependencies
└── .env             # Environment variables
```
