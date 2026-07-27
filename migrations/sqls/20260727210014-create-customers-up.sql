CREATE TABLE customers (
  id SERIAL PRIMARY KEY,

  user_id INT UNIQUE,

  name VARCHAR(255) NOT NULL DEFAULT 'Guest Customer',

  phone VARCHAR(50),

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_customer_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL,

  CONSTRAINT unique_customer_phone
    UNIQUE (phone)
);