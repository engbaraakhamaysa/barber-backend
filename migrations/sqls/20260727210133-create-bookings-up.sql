CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,

  slot_id INT NOT NULL,

  customer_id INT NOT NULL,

  status VARCHAR(50) NOT NULL DEFAULT 'confirmed',

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_booking_slot
    FOREIGN KEY (slot_id)
    REFERENCES booking_slots(id)
    ON DELETE RESTRICT,

  CONSTRAINT fk_booking_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(id)
    ON DELETE RESTRICT,

  CONSTRAINT booking_status_check
    CHECK (
      status IN (
        'confirmed',
        'completed',
        'cancelled',
        'no_show'
      )
    ),

  CONSTRAINT unique_booking_slot
    UNIQUE (slot_id)
);