DROP TABLE IF EXISTS orders;
DROP SEQUENCE IF EXISTS orders_orders_id_seq;
CREATE TABLE orders(orders_id SERIAL PRIMARY KEY,
product_id INTEGER,
quantity INTEGER NOT NULL,
status_id INTEGER,
user_id INTEGER,
FOREIGN KEY (product_id) REFERENCES products(product_id),
FOREIGN KEY (status_id) REFERENCES order_status(status_id),
FOREIGN KEY (user_id) REFERENCES users(user_id));
