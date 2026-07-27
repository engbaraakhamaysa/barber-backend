CREATE TABLE queue_entries (
  id SERIAL PRIMARY KEY,

  barber_id INT NOT NULL,

  customer_id INT NOT NULL,

  status VARCHAR(50) NOT NULL DEFAULT 'waiting',

  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),

  called_at TIMESTAMP,

  started_at TIMESTAMP,

  completed_at TIMESTAMP,

  cancelled_at TIMESTAMP,

  CONSTRAINT fk_queue_barber
    FOREIGN KEY (barber_id)
    REFERENCES barbers(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_queue_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(id)
    ON DELETE CASCADE,

  CONSTRAINT queue_status_check
    CHECK (
      status IN (
        'waiting',
        'called',
        'in_service',
        'completed',
        'cancelled'
      )
    )
);