# Moongazer Configuration Manager

## Overview
Moongazer Configuration Manager is an Express.js-based backend service designed to provide information about crypto.  
This project leverages modern JavaScript with ES modules and includes a variety of dependencies for security, validation, database interaction, and more.

---

## Features
- Express 5 for API routing and middleware
- Environment configuration using dotenv
- Input validation with Joi
- Authentication and authorization support with JWT and bcrypt
- PostgreSQL database interaction using Knex and Objection.js ORM
- Email sending with Nodemailer
- Security hardening via Helmet
- Cross-Origin Resource Sharing (CORS) support
- HTTP-friendly error handling using @hapi/boom
- Utility libraries: Lodash, Moment.js, UUID generation
- Development auto-reloading with Nodemon

---

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone <repository_url>
   cd moongazer-configuration-manager
   cp .env.example .env
   npm install
   npm run start

### Project Structure

/
├── node_modules/ # Installed npm packages
├── public/ # Public static assets (if any)
├── src/ # Source files
│ ├── auth/ # Authentication related modules and controllers
│ ├── ping/ # Health check or ping endpoints
│ ├── platforms/ # Platform-specific code or integrations
│ ├── routes/ # Route definitions
│ ├── watchList/ # Watchlist feature modules
│ └── app.js # Main Express app entry point
├── .env # Environment configuration (local, not committed)
├── .env.example # Example env config to copy from
├── .gitignore # Git ignore rules
├── package.json # Project metadata and dependencies
├── package-lock.json # Exact versions of installed packages
└── README.md # Project documentation

## Dependencies

express — Web framework

@hapi/boom — HTTP-friendly error objects

axios — Promise based HTTP client

bcrypt — Password hashing

body-parser — Parsing incoming request bodies

cors — Cross-Origin Resource Sharing middleware

dotenv — Loads environment variables

helmet — Security headers middleware

joi — Schema validation

jsonwebtoken — JSON Web Token implementation

knex — SQL query builder

objection — ORM built on Knex

nodemailer — Email sending

nodemon — Development auto-reload

pg — PostgreSQL client

lodash — Utility library

moment — Date/time manipulation

uuid — Unique ID generation
