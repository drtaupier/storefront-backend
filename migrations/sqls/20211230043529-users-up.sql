DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS users_user_id_seq;
CREATE TABLE users(user_id SERIAL PRIMARY KEY, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, username VARCHAR(50) NOT NULL, password VARCHAR(100) NOT NULL, role_id INTEGER, FOREIGN KEY (role_id) REFERENCES roles(role_id));