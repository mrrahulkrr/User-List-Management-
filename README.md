# User List Management and Email Sending API

## Overview

This project is a RESTful API for managing a list of users with customizable properties and sending emails to those users. It is built using Node.js, Express.js, and MongoDB.

## Features

1. **List Creation**: Admins can create a list with a title and custom properties.
2. **User Addition**: Admins can add users to the list via CSV upload. The application efficiently handles CSVs with 10,000+ records.
3. **Email Sending**: Admins can send emails to the entire list with customizable placeholders.
4. **Unsubscribe**: Users can unsubscribe from the list to stop receiving emails.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mocha (for testing)
- Chai (for assertions)
- Multer (for handling file uploads)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/user-list-management.git
   cd user-list-management
Install the dependencies:

2. Install the dependencies:
```sh
npm install
Set up your environment variables in a .env file:
```

3. Set up your environment variables in a .env file:
```sh
PORT=3000
MONGODB_URI=mongodb://localhost:27017/userlistmanagement
EMAIL_SERVICE=your-email-service
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
Start the server:
```


4. Run tests:

```sh
npm test
```
# API Documentation

## Endpoints

### Create a List

- **URL**: `/api/lists`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Test List",
    "customProperties": [
      { "title": "city", "fallback": "Unknown" }
    ]
  }

**Success Response:**
- **Code**: 201
- **Content**:
  ```json
  {
    "_id": "listId",
    "title": "Test List",
    "customProperties": [
      { "title": "city", "fallback": "Unknown" }
    ]
  }

Add Users to the List via CSV
- **URL**: `/api/lists/:listId/users`
- **Method**: `POST`
**Add Users to the List via CSV**

- **Form-Data**:
  - `file`: The CSV file containing users.

**Success Response:**
- **Code**: 200
- **Content**:
  ```json
  {
    "successCount": 2,
    "errorCount": 0,
    "errors": [],
    "users": [
      {
        "_id": "userId",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "city": "Bengaluru"
      },
      {
        "_id": "userId",
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "city": "Unknown"
      }
    ]
  }


**Send Email to the List**

- **URL**: `/api/lists/:listId/send-email`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "subject": "Welcome!",
    "body": "Hey [name]!\n\nThank you for signing up with your email [email]. We have received your city as [city].\n\nTeam MathonGo."
  }

**Success Response:**
- **Code**: 200
- **Content**:
  ```json
  {
    "count": 2
  }

**Unsubscribe a User**

- **URL**: `/api/lists/:listId/unsubscribe/:userId`
- **Method**: `POST`

**Success Response:**
- **Code**: 200
- **Content**:
  ```json
  {
    "message": "User unsubscribed"
  }

##Testing
The project includes unit and integration tests using Mocha and Chai. To run the tests, use the following command:

```sh
npm test
```




