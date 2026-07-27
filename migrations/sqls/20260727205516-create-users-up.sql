CREATE TABLE users (
  id SERIAL PRIMARY KEY,

  name VARCHAR(255) NOT NULL,

  email VARCHAR(255) UNIQUE NOT NULL,

  password VARCHAR(255) NOT NULL,

  role VARCHAR(50) NOT NULL DEFAULT 'barber',

  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT users_role_check
    CHECK (role IN ('admin', 'barber','user'))
);