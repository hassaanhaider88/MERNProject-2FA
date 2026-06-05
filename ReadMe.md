# 2FA Authentication System

This project implements a robust backend authentication system featuring user registration, login, and Two-Factor Authentication (2FA). It is built as a REST API to manage user accounts and secure access.

## Tech Stack

*   **Languages:**
    *   JavaScript
*   **Frameworks:**
    *   ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
*   **Key Libraries / Tools:**
    *   ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
    *   ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
    *   ![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)
    *   `bcryptjs` (Password Hashing)
    *   `cors` (CORS Management)
    *   `dotenv` (Environment Variables)
    *   `express-session` (Session Management)
    *   `passport` (Authentication Middleware)
    *   `passport-local` (Local Strategy for Passport.js)
    *   `speakeasy` (Two-Factor Authentication)
    *   `qrcode` (QR Code Generation)
    *   `nodemon` (Development Server)

## Project Structure

```
.
├── src/
│   ├── config/
│   │   ├── dbConnection.js
│   │   └── passportConfig.js
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── index.js
└── package.json
```

## Key Features

*   User Registration with password hashing (bcryptjs)
*   User Login and Session Management (Passport.js local strategy)
*   Two-Factor Authentication (2FA) setup
*   Two-Factor Authentication (2FA) verification
*   Two-Factor Authentication (2FA) reset
*   User Logout
*   REST API for authentication
*   Database integration with MongoDB (Mongoose ODM)

## API Endpoints

All API endpoints are prefixed with `/api/auth`.

| HTTP Method | Route          | Description                                           | Request Data                             | Response                                            |
| :---------- | :------------- | :---------------------------------------------------- | :--------------------------------------- | :-------------------------------------------------- |
| `POST`      | `/register`    | Registers a new user.                                 | `username`, `password`                   | `201 Created` - `success`, `message`, `data` (user) |
| `POST`      | `/login`       | Authenticates a user and establishes a session.       | `username`, `password`                   | `201 Created` - `success`, `message`, `data` (user) |
| `GET`       | `/status`      | Checks the current user's authentication status.      | None                                     | `200 OK` - `success`, `message`, `username`, `is2FAEnabled` |
| `GET`       | `/logout`      | Logs out the authenticated user and destroys the session. | None                                     | `200 OK` - `success`, `message`                     |
| `POST`      | `/2fa/setup`   | Initiates 2FA setup for the authenticated user.       | None                                     | `200 OK` - `success`, `message`, `secret`, `qrCodeUrl` |
| `POST`      | `/2fa/verify`  | Verifies the provided 2FA token.                      | `token`                                  | `200 OK` - `success`, `message`                     |
| `POST`      | `/2fa/reset`   | Resets or disables 2FA for the authenticated user.    | None                                     | `200 OK` - `success`, `message`                     |

## Setup Instructions

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/hassaanhaider88/MERNProject-2FA.git
    cd MERNProject-2FA
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
MONGODB_URL="your_mongodb_connection_string"
SESSION_SECRET="a_strong_secret_for_sessions"
```

*   `PORT`: The port on which the server will run.
*   `MONGODB_URL`: Your MongoDB connection string.
*   `SESSION_SECRET`: A secret key used to sign the session ID cookie.

### Run the Project

To start the development server, run:

```bash
npm run dev
```

The server will be running at `http://localhost:<PORT>` (e.g., `http://localhost:5000`).

## This readMe has been coded via [Repo.ReadMe](https://repo-reademe.org/)