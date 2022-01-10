# API REQUIREMENTS

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

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

### Orders-products

- Index : '/orders-products' [GET]
- Show : '/orders-products/:orders_products_id' [GET]
- Create : '/orders-products' [POST]
- Destroy : '/orders-products/:orders_products_id' [POST]

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

### Orders-Products

- orders_products_id
- quantity
- orders_id from orders table
- product_id from products table
