CREATE TABLE customer_barber_blocks (
  id SERIAL PRIMARY KEY,

  customer_id INT NOT NULL,

  barber_id INT NOT NULL,

  reason VARCHAR(500),

  is_active BOOLEAN NOT NULL DEFAULT true,

  blocked_at TIMESTAMP NOT NULL DEFAULT NOW(),

  unblocked_at TIMESTAMP,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_block_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_block_barber
    FOREIGN KEY (barber_id)
    REFERENCES barbers(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_active_customer_barber_block
    UNIQUE (customer_id, barber_id)
);