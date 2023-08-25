
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  password TEXT NOT NULL, 
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE prompts (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  date DATE NOT NULL,
  prompt_text TEXT NOT NULL,
  comments TEXT NOT NULL,
  user_id integer REFERENCES users(id) 
);