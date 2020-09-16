CREATE TABLE account(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    address VARCHAR(100),
    phone VARCHAR(30),
    "emailHash" VARCHAR(64),
    "passwordHash" VARCHAR(64),
    "sessionId" VARCHAR(36)
);

CREATE TABLE product(
  p_id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES ACCOUNT(id),
  p_title VARCHAR(40) NOT NULL,
  p_category VARCHAR(40) NOT NULL,
  size VARCHAR(10) NOT NULL,
  color VARCHAR(10) NOT NULL,
  p_description VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  pic_name VARCHAR(100)
);

CREATE TABLE CART(
  cart_id SERIAL,
  user_id INTEGER REFERENCES ACCOUNT(id),
  owner_id INTEGER REFERENCES ACCOUNT(id),
  product_id INTEGER REFERENCES PRODUCT(p_id),
  p_title VARCHAR(40) NOT NULL,
  price INTEGER NOT NULL,
  PRIMARY KEY(cart_id,user_id,owner_id,product_id)
);
