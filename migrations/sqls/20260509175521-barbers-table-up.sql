/* Replace with your SQL commands */


CREATE TABLE barbers (
  id SERIAL PRIMARY KEY,

  shop_id INT NOT NULL,

  name VARCHAR(255) NOT NULL,

  email VARCHAR(255) UNIQUE NOT NULL,

  password VARCHAR(255) NOT NULL,

  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_shop
    FOREIGN KEY (shop_id)
    REFERENCES shops(id)
    ON DELETE CASCADE
);