# Storefront

This project was made with the next technologys:

- Node/Express
- TypeScript
- dotenv from NPM for managing environment variables
- Postgres for the DataBase
- db-migrate from NPM for migrations
- jsonwebtoken
- Jasmine from NPM Unit Test

After clone the repository, you have to run the next command to install the dependencies:

```
npm install
```

For run the application:

```
- npm run build
```

## Intructions to use:

Create user:

- CREATE USER full_stack_user WITH PASSWORD 'Pass1234';

You can follow the next steps:

1. CREATE DATABASE storefront;
2. CREATE DATABASE storefront_test;
3. GRANT ALL PRIVILEGES ON DATABASE storefront TO full_stack_user;
4. GRANT ALL PRIVILEGES ON DATABASE storefront_test TO full_stack_user;

## .env data:

You will need add .env file with the next data:

```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_TEST_DB=storefront_test
ENV=dev
BCRYPT_PASSWORD=holamundo
SALT_ROUNDS=10
TOKEN_SECRET=palabrasecreta123
```

Then, you have to run the next command:

```
- db-migrate up
```

## Testing

```
- npm run test
```

## Server

```
- npm run start
```
