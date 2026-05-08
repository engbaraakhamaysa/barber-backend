/* Replace with your SQL commands */

CREATE TABLE shops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT unique_shop_name_location
  UNIQUE(name, location)
);