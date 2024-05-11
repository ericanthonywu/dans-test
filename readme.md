# Node.js Project

Dans Multi Pro Node JS project test

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and npm installed on your machine.

### Installation

1. Clone the repository: `git clone https://github.com/YourUsername/YourProject.git`
2. Rename `.env.template` to `.env` and replace the placeholders with your actual data: `cp .env.template .env`
3. Install the dependencies via npm: `npm install `
4. Run knex migrations and seed the database: `knex migrate:latest && knex seed:run`

### Database Configuration

This application requires postgresql. Please ensure you have your database server configured and running.

### Testing

The project comes pre-populated with some test user accounts for development/testing purposes. They can also be used for logging into the application. After running the knex seed command, you will have the following test users:

| Username  | Password |
| --------- | -------- |
| test0     | test     |
| test1     | test     |
| test2     | test     |
| test3     | test     |
| test4     | test     |
| test5     | test     |
| test6     | test     |
| test7     | test     |
| test8     | test     |
| test9     | test     |

Please note that the password for all the test users is 'test'.

### Available Endpoints

This application has the following endpoints:

1. `auth/api/login` - (POST) Login route.
2. `api/job` - (GET) Retrieves jobs. Accepts optional query parameters: `description`, `full_time`, and `location`.
3. `api/job/details` - (GET) Retrieves job details.

### Authors

- Eric Anthony
