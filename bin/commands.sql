CREATE TABLE account(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(500),
    phone VARCHAR(30),
    "emailHash" VARCHAR(64),
    "passwordHash" VARCHAR(64),
    "sessionId" VARCHAR(36)
);

CREATE TABLE product(
  p_id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES ACCOUNT(id),
  p_title VARCHAR(100) NOT NULL,
  p_category VARCHAR(100) NOT NULL,
  size VARCHAR(100) NOT NULL,
  color VARCHAR(100) NOT NULL,
  p_description VARCHAR(500) NOT NULL,
  price INTEGER NOT NULL,
  url VARCHAR(500)
);

CREATE TABLE CART(
  cart_id SERIAL,
  user_id INTEGER REFERENCES ACCOUNT(id),
  owner_id INTEGER REFERENCES ACCOUNT(id),
  product_id INTEGER REFERENCES PRODUCT(p_id),
  p_title VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  PRIMARY KEY(cart_id,user_id,owner_id,product_id)
);
