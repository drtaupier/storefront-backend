DROP TABLE IF EXISTS orders;
DROP SEQUENCE IF EXISTS orders_orders_id_seq;
CREATE TABLE orders(orders_id SERIAL PRIMARY KEY,
status_id INTEGER,
user_id INTEGER,
FOREIGN KEY (status_id) REFERENCES order_status(status_id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);
