CREATE TABLE barbers (
  id SERIAL PRIMARY KEY,

  user_id INT NOT NULL,

  shop_id INT NOT NULL,

  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_barber_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT,

  CONSTRAINT fk_barber_shop
    FOREIGN KEY (shop_id)
    REFERENCES shops(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_barber_user
    UNIQUE (user_id)
);