CREATE TABLE account(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    "emailHash" VARCHAR(64),
    "passwordHash" VARCHAR(64),
    "sessionId" VARCHAR(36)
);

CREATE TABLE product(
  p_id SERIAL PRIMARY KEY,
  p_title VARCHAR(40) NOT NULL,
  size VARCHAR(10) NOT NULL,
  p_description VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE CART(
  cart_id SERIAL,
  user_id INTEGER REFERENCES ACCOUNT(id),
  product_id INTEGER REFERENCES PRODUCT(p_id),
  name VARCHAR(64) NOT NULL,
  address VARCHAR(128) NOT NULL,
  p_title VARCHAR(40) NOT NULL,
  price INTEGER NOT NULL,
  PRIMARY KEY(cart_id,user_id,product_id)
);
