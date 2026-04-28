/* Replace with your SQL commands */


CREATE TABLE chairs (
  id SERIAL PRIMARY KEY,
  shop_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) DEFAULT 'normal',
  is_active BOOLEAN DEFAULT true,

  CONSTRAINT fk_shop
  FOREIGN KEY (shop_id)
  REFERENCES shops(id)
  ON DELETE CASCADE
);