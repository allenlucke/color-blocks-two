## React Redux TypeScript Docker Boilerplate

## Description
The React Redux TypeScript Docker Boilerplate is a template created for projects ran on docker with a React-Redux front-end and a Express/Typescript/PostgreSQL back-end.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Docker]

## Installation
1. Clone the repo from github.
2. Create `.env file`.
3. Run `docker-compose up --build` in the terminal

## `.env File Setup
In the `.env` file you will need the following lines fo code for nodemailer to access you gmail account.

    `DATABASE_NAME="yourDBName"
     DOCKER_DB_HOST=localhost
     DOCKER_DB_USER=username
     DOCKER_DB_PASS="yourPassword"
     DOCKER_DB_PORT=5432
     NODE_ENV=development
     SERVER_SESSION_SECRET="yourSessionSecret"
     PORT=5000`

## Built With
Node, Express, TypeScript, Javascript, PostgreSQL, React, Redux, Nodemailer, html5, CSS3, Logger, Material UI A full list of dependencies can be found in `package.json`.

## Support
If you have suggestions or issues, please email me at allenlucke@gmail.com
