DROP TABLE IF EXISTS orders_products;
DROP SEQUENCE IF EXISTS orders_products_orders_products_id_seq;
CREATE TABLE orders_products(orders_products_id SERIAL PRIMARY KEY,
quantity INTEGER DEFAULT 1,
orders_id INTEGER,
product_id INTEGER,
FOREIGN KEY (orders_id) REFERENCES orders(orders_id),
FOREIGN KEY (product_id) REFERENCES products(product_id));