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
