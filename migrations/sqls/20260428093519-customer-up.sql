/* Replace with your SQL commands */


CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) DEFAULT 'customer',
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);