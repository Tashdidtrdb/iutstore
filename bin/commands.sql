CREATE TABLE account(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    address VARCHAR(128),
    hall VARCHAR(10),
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
