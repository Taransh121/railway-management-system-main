# Railway Management System API

This project is a Railway Management System API similar to IRCTC, built using Node.js, Express.js, and MySQL. The system includes functionalities for user registration, login, train management by admin, seat availability checking, seat booking, and role-based access control.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features

- User Registration and Login
- Train Management (Admin)
- Check Seat Availability
- Book Seats
- Role-Based Access Control
- JWT Authentication
- Handle Race Conditions in Booking

## Tech Stack

- Node.js
- Express.js
- MySQL
- Prisma ORM
- JWT for Authentication

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/railway-management-system.git
   cd railway-management-system
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   JWT_SECRET="your_generated_jwt_secret"
   ADMIN_API_KEY="your_generated_admin_api_key"
   PORT=3000
   ```

4. **Set up the database:**

   Make sure your MySQL server is running and the database specified in `DATABASE_URL` is created.

   Run the Prisma migrations to set up the database schema:

   ```sh
   npx prisma migrate dev --name init
   ```

## Running the Application

1. **Start the server:**

   ```sh
   npm start
   ```

2. The server will be running on `http://localhost:3000`.

## API Endpoints

### Authentication

- **Register a User**

  ```
  POST /auth/register
  ```

  Request Body:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Login User**

  ```
  POST /auth/login
  ```

  Request Body:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Train Management (Admin)

- **Add a New Train**

  ```
  POST /admin/addTrain
  ```

  Headers:

  ```json
  {
    "API-Key": "your_generated_admin_api_key"
  }
  ```

  Request Body:

  ```json
  {
    "name": "string",
    "source": "string",
    "destination": "string",
    "totalSeats": "number"
  }
  ```

- **Update Train Details**

  ```
  PUT /admin/updateTrain/:trainId
  ```

  Headers:

  ```json
  {
    "API-Key": "your_generated_admin_api_key"
  }
  ```

  Request Body:

  ```json
  {
    "name": "string",
    "source": "string",
    "destination": "string",
    "totalSeats": "number"
  }
  ```

### Train and Booking Operations

- **Get Seat Availability**

  ```
  GET /trains/availability
  ```

  Query Parameters:

  ```json
  {
    "source": "string",
    "destination": "string"
  }
  ```

- **Book a Seat**

  ```
  POST /bookings/book
  ```

  Headers:

  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```

  Request Body:

  ```json
  {
    "trainId": "number"
  }
  ```

- **Get Specific Booking Details**

  ```
  GET /bookings/:id
  ```

  Headers:

  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```

## Assumptions

- The `DATABASE_URL` in the `.env` file should point to a valid MySQL database.
- `JWT_SECRET` should be a securely generated secret key.
- `ADMIN_API_KEY` should be a securely generated API key that only the admin knows.

## License

This project is licensed under the MIT License.
