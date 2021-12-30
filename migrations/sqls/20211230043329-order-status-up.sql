DROP TABLE IF EXISTS order_status;
DROP SEQUENCE IF EXISTS order_status_status_id_seq;
CREATE TABLE order_status(status_id SERIAL PRIMARY KEY, order_status VARCHAR(20) NOT NULL);

INSERT INTO order_status (order_status) VALUES ('IN PROCESS');
INSERT INTO order_status (order_status) VALUES ('DELIVERED');
