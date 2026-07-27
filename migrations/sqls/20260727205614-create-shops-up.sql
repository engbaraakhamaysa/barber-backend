CREATE TABLE shops (
  id SERIAL PRIMARY KEY,

  name VARCHAR(255) NOT NULL,

  location VARCHAR(255) NOT NULL,

  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_shop_name_location
    UNIQUE (name, location)
);