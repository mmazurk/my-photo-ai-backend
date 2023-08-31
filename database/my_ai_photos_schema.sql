
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL, 
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE prompts (
  prompt_id SERIAL PRIMARY KEY,
  username varchar(25) references users(username),
  title text NOT NULL,
  date DATE NOT NULL,
  prompt_text TEXT NOT NULL,
  comments TEXT NOT NULL
);