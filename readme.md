# Authentication and Authorization Backend

This document outlines the setup for an authentication and authorization system using Node.js,
 Express, MongoDB, and JWT. It includes routes for user signup, login, logout,
  and middleware for token verification and refresh token handling.

---

## Features

- **User Registration**: Securely register new users with unique email and username validation.
- **User Login**: Authenticate users and provide access and refresh tokens for session management.
- **Token Refresh**: Regenerate access tokens using refresh tokens without requiring re-login.
- **User Logout**: Securely log out users and invalidate their refresh tokens.
- **Middleware**: Protect routes with JWT-based token verification middleware.

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the root directory with the following keys:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   ACCESS_TOKEN_SECRET=<your-access-token-secret>
   REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
   PORT=5000
   ```

4. **Run the Server**:
   ```bash
   npm start
   ```

---
