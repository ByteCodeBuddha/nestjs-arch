<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Starter Repository

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# NestJS-arch

NestJS arch is an open-source application that provides a secure and scalable architecture. The project leverages various technologies such as Docker, different JWT strategies, Prisma ORM, request/response tracking, database logging, Redis for storing hashed access tokens, refresh token mechanism, storing refresh tokens in the database, IP-based single sign-on, CORS, Helmet for security, custom header middlewares, and maximum login attempts enforcement.

## Description

The Project aims to simplify the management and security  through a robust and extensible application. It utilizes Docker containers to provide an isolated and scalable environment for the application and its dependencies.

The project incorporates different JWT (JSON Web Token) strategies for authentication and authorization. It supports access token and refresh token mechanisms, with access tokens being securely hashed and stored in Redis. Refresh tokens are securely stored in the database, allowing for efficient token revocation and renewal.

To enhance security, IP-based single sign-on is implemented, ensuring that users can access their accounts only from trusted IP addresses. The project also implements various security measures such as CORS (Cross-Origin Resource Sharing) and Helmet middleware to mitigate common security vulnerabilities.

Request and response tracking is implemented to log incoming and outgoing requests, providing valuable insights and troubleshooting capabilities. Additionally, database logging is enabled, allowing for detailed tracking and analysis of database transactions.

The project integrates Prisma ORM for database management, providing an intuitive and efficient interface for working with the underlying database. Prisma migrations are used to manage database schema changes and ensure consistency across different environments.

In addition to the aforementioned features, the project includes custom header middlewares for fine-grained control over HTTP headers, as well as enforcing maximum login attempts to protect against brute-force attacks.

## Key Features

- Docker containerization for scalability and isolation
- Different JWT strategies for authentication and authorization
- Prisma ORM for efficient database management
- Request and response tracking for logging and troubleshooting
- Database logging for comprehensive transaction analysis
- Redis for secure storage of hashed access tokens
- Refresh token mechanism with secure storage in the database
- IP-based single sign-on for enhanced security
- CORS and Helmet middleware for security measures
- Custom header middlewares for flexible HTTP header control
- Maximum login attempts enforcement to protect against brute-force attacks

## Installation

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/ByteCodeBuddha/nestjs-arch.git`
2. Navigate to the project directory: `cd nestjs-arch`
3. Install dependencies: `yarn install`

## Configuration

The project requires some configuration to work properly. Follow these steps to set up the configuration:

1. Create a `.env` file in the project root directory.
2. Fill in the necessary environment variables in the `.env` file based on your requirements. Here's an example:

```dotenv
# Environment
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:admin@123@localhost:5432/ehr?schema=public"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_ACCESS_TOKEN_SECRET=123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTU
JWT_REFRESH_TOKEN_SECRET=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTU123456789

# SSO
SSO=true

# Logging
DB_LOGGING=true
REQUEST_RESPONSE_LOGGING=true
SECURITY_LOGGING=true
```

## Database Setup

The project uses a database for data storage. Follow these steps to set up the database:

### Development Database

1. Start the development database: `yarn db:dev:up` <!-- Start the development database container -->
2. Deploy the Prisma migrations for the development environment: `yarn prisma:dev:deploy` <!-- Deploy Prisma migrations for development -->

### Test Database

1. Start the test database: `yarn db:test:up` <!-- Start the test database container -->
2. Deploy the Prisma migrations for the test environment: `yarn prisma:test:deploy` <!-- Deploy Prisma migrations for testing -->

## Usage

To start the project, use the following commands:

- Start the project in development mode: `yarn start:dev` <!-- Start the project in development mode -->
- Start the project in debug mode: `yarn start:debug` <!-- Start the project in debug mode -->
- Start the project in production mode: `yarn start:prod` <!-- Start the project in production mode -->

## Testing

The project includes a comprehensive test suite. Use the following commands for testing:

- Run all tests: `yarn test` <!-- Run all tests -->
- Run tests in watch mode: `yarn test:watch` <!-- Run tests in watch mode -->
- Generate test coverage report: `yarn test:cov` <!-- Generate test coverage report -->
- Debug tests: `yarn test:debug` <!-- Debug tests -->
- Run end-to-end tests: `yarn test:e2e` <!-- Run end-to-end tests -->

## Code Formatting and Linting

The project includes code formatting and linting tools. Use the following commands for formatting and linting:

- Format code using Prettier: `yarn format` <!-- Format code using Prettier -->
- Lint code using ESLint: `yarn lint` <!-- Lint code using ESLint -->

## Other Scripts

The project provides additional scripts for various purposes:

- Build the project: `yarn build` <!-- Build the project -->
- Deploy Prisma migrations for the development environment: `yarn prisma:dev:deploy` <!-- Deploy Prisma migrations for development -->
- Migrate the development database: `yarn prisma:dev:migrate` <!-- Migrate development database -->
- Push changes to the development database: `yarn prisma:dev:push` <!-- Push changes to development database -->
- Pull changes from the development database: `yarn prisma:dev:pull` <!-- Pull changes from development database -->

- Remove the development database container: `yarn db:dev:rm` <!-- Remove development database container -->
- Restart the development database: `yarn db:dev:restart` <!-- Restart development database -->
- Deploy Prisma migrations for the test environment: `yarn prisma:test:deploy` <!-- Deploy Prisma migrations for testing -->
- Push changes to the test database: `yarn prisma:test:push` <!-- Push changes to test database -->
- Pull changes from the test database: `yarn prisma:test:pull` <!-- Pull changes from test database -->
- Remove the test database container: `yarn db:test:rm` <!-- Remove test database container -->
- Restart the test database: `yarn db:test:restart` <!-- Restart test database -->

Feel free to explore the project and make any necessary modifications according to your needs.

# Project Directory Structure

```
.
├── doc
├── prisma
│   └── migrations
│       ├── 20230521132419_
│       └── 20230521193518_
├── scripts
├── security-events
└── src
    ├── common
    │   ├── constants
    │   ├── decorators
    │   ├── exceptions
    │   ├── filters
    │   ├── interceptors
    │   ├── interfaces
    │   ├── middlewares
    │   ├── pipes
    │   ├── services
    │   └── util
    │       ├── email
    │       └── sms
    ├── config
    ├── core
    │   ├── auth
    │   │   ├── controllers
    │   │   ├── dto
    │   │   ├── guards
    │   │   ├── services
    │   │   ├── strategy
    │   │   └── types
    │   ├── cache
    │   ├── database
    │   │   ├── inmemory
    │   │   │   └── redis
    │   │   └── mysql
    │   │       └── prisma
    │   └── logger
    └── modules
        ├── sample-module
        │   ├── controllers
        │   ├── dto
        │   ├── interfaces
        │   ├── repositories
        │   ├── services
        │   └── validators
        └── user
            ├── dto
            └── interfaces
```

## Directory Structure Explanation

- **doc**: Contains documentation related to the project.

- **prisma**: Contains Prisma-related files and directories.
  - **migrations**: Stores Prisma database migration files.

- **scripts**: Holds scripts and utility files for the project.

- **security-events**: Stores security-related event files.

- **src**: Contains the main source code of the project.
  - **common**: Houses common utility, constants, decorators, exceptions, filters, interceptors, interfaces, middlewares, pipes, and services used throughout the project.
    - **util**: Contains utility files for email and SMS functionalities.
  - **config**: Stores configuration files for the project.
  - **core**: Contains core modules and functionality.
    - **auth**: Handles authentication-related modules and functionality.
      - **controllers**: Contains controllers for authentication.
      - **dto**: Holds data transfer objects (DTOs) for authentication.
      - **guards**: Implements guards for authentication.
      - **services**: Provides services for authentication.
      - **strategy**: Contains different authentication strategies.
      - **types**: Defines types related to authentication.
    - **cache**: Handles caching functionality.
    - **database**: Manages database-related modules.
      - **inmemory**: Handles in-memory database functionality.
        - **redis**: Contains Redis-related functionality for in-memory database.
      - **mysql**: Handles MySQL database functionality.
        - **prisma**: Contains Prisma-related files for the MySQL database.
    - **logger**: Implements logging functionality.
  - **modules**: Contains different modules of the project.
    - **sample-module**: Represents a sample module with its own controllers, DTOs, interfaces, repositories, services, and validators.
    - **user**: Represents the user module with its own DTOs and interfaces.

- **test**: Contains test files and directories for the project.

This directory structure provides a modular organization for your Nest.js project, separating different functionalities and components into their respective directories. It helps maintain a clean and organized code


## Contributing

If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch from the `master` branch.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the `master` branch of the main repository.

## License

This project is licensed under the [MIT License](LICENSE).
