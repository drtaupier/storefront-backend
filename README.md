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

## API Endpoints

### Users

- Index [token required] : '/users' [GET]
- Show [token required] : '/users/:user_id' [GET]
- Create [token required] : '/users' [POST]
- Destroy '/users/:user_id' [POST]
- Authenticate '/user/login' [POST]

### Products

- Index : '/products' [GET]
- Show : '/products/:product_id' [GET]
- Create [token required] : '/products' [POST]
- Destroy : '/products/:product_id' [POST]

### Orders

- Index : '/orders' [GET]
- Show : '/orders/:orders_id' [GET]
- Create : '/orders' [POST]
- Destroy : '/orders/:orders_id' [POST]

## Data Shapes

### User

- user_id
- firstName
- lastName
- username
- password
- role

Table: users (user_id:primary key, firstname:varchar, lastName:varchar , username:varchar, password:varchar, role:varchar)

### Product

- product_id
- name
- price

Table: products(product_id:primary key, name:varchar, price:varchar)

### Orders

- product_id from products table
- quantity
- status_id from status table
- user_id from users table
