/* Replace with your SQL commands */


CREATE TABLE shops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);