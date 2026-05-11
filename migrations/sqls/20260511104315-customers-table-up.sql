/* Replace with your SQL commands */

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,

  barber_id INT NOT NULL,

  name VARCHAR(255) NOT NULL,

  phone VARCHAR(50),

  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_barber
    FOREIGN KEY (barber_id)
    REFERENCES barbers(id)
    ON DELETE CASCADE
);