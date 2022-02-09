DROP TABLE IF EXISTS orders_products;
DROP SEQUENCE IF EXISTS orders_products_orders_products_id_seq;
CREATE TABLE orders_products(orders_products_id SERIAL PRIMARY KEY,
quantity INTEGER DEFAULT 1,
orders_id bigint REFERENCES orders(orders_id),
product_id bigint REFERENCES products(product_id));