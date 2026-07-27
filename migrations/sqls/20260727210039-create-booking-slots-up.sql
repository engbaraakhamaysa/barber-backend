CREATE TABLE booking_slots (
  id SERIAL PRIMARY KEY,

  barber_id INT NOT NULL,

  slot_time TIMESTAMP NOT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_booking_slot_barber
    FOREIGN KEY (barber_id)
    REFERENCES barbers(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_barber_slot
    UNIQUE (barber_id, slot_time)
);