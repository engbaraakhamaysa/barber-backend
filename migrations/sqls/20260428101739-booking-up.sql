/* Replace with your SQL commands */


CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,

  shop_id INT NOT NULL,
  chair_id INT NOT NULL,
  customer_id INT NOT NULL,

  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,

  status VARCHAR(50) DEFAULT 'scheduled',

  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_shop
    FOREIGN KEY (shop_id) REFERENCES shops(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_chair
    FOREIGN KEY (chair_id) REFERENCES chairs(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_customer
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE
);