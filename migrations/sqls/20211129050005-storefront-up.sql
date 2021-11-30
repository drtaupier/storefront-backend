CREATE TABLE users(user_id SERIAL PRIMARY KEY,firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL);
CREATE TABLE product(product_id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, price integer NOT NULL);
CREATE TABLE orders(orders_id SERIAL PRIMARY KEY, quantity integer NOT NULL);
CREATE TABLE order_status(status_id SERIAL PRIMARY KEY, order_status VARCHAR(20) NOT NULL);
