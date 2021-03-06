DROP TABLE IF EXISTS product;
DROP SEQUENCE IF EXISTS product_product_id_seq;
CREATE TABLE products(product_id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, price INTEGER CHECK(price >= 0) NOT NULL);
