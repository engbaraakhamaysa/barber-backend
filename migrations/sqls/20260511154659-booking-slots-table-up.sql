/* Replace with your SQL commands */


CREATE TABLE booking_slots (
  id SERIAL PRIMARY KEY,

  barber_id INT NOT NULL,

  slot_time TIMESTAMP NOT NULL,

  is_booked BOOLEAN DEFAULT false,

  customer_name VARCHAR(255),

  customer_phone VARCHAR(50),

  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_barber
    FOREIGN KEY (barber_id)
    REFERENCES barbers(id)
    ON DELETE CASCADE
);