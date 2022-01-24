# API REQUIREMENTS

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users

- Index [token required] : '/users' [GET]
- Show [token required] : '/users/:user_id' [GET]
- Create [token required] : '/users' [POST]
- Destroy '/users/:user_id' [DELETE]
- Authenticate '/user/login' [POST]

### Products

- Index : '/products' [GET]
- Show : '/products/:product_id' [GET]
- Create [token required] : '/products' [POST]
- Destroy : '/products/:product_id' [DELETE]

### Orders

- Index : '/orders' [GET]
- Show : '/orders/:orders_id' [GET]
- Create : '/orders' [POST]
- Destroy : '/orders/:orders_id' [DELETE]

### Orders-products

- Index : '/orders-products' [GET]
- Show : '/orders-products/:orders_products_id' [GET]
- Create : '/orders-products' [POST]
- Destroy : '/orders-products/:orders_products_id' [DELETE]

## Data Shapes

### User

- user_id - SERIAL PRIMARY KEY
- firstName - VARCHAR(50)
- lastName - VARCHAR(50)
- username - VARCHAR(50)
- password - VARCHAR(100)
- role_id - FOREIGN KEY (role_id) REFERENCES roles(role_id)

### Product

- product_id - SERIAL PRMARY KEY
- name - VARCHAR(50) NOT NULL
- price - INTEGER NOT NULL

### Orders

- orders_id - SERIAL PRIMARY KEY
- product_id - FOREIGN KEY (product_id) REFERENCES products(product_id)
- quantity SMALLINT
- status_id INTEGER from status table
- user_id FOREIGN KEY (user_id) REFERENCES users(user_id)

### Orders-Products

- orders_products_id - SERIAL PRIMARY KEY
- quantity - SMALLINT
- orders_id INTEGER REFERENCES orders(orders_id)
- product_id INTEGER REFERENCES products(product_id)
