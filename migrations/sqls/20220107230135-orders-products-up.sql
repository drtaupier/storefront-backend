DROP TABLE IF EXISTS orders_products;
DROP SEQUENCE IF EXISTS orders_products_orders_products_id_seq;
CREATE TABLE orders_products(orders_products_id SERIAL PRIMARY KEY,
quantity SMALLINT DEFAULT 1,
orders_id INTEGER REFERENCES orders(orders_id) ON DELETE CASCADE ON UPDATE CASCADE,
product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE);