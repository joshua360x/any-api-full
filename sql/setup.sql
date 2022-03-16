-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS phones;



CREATE TABLE phones (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  year_realeased INT NOT NULL CHECK (year_realeased > 1990),
  inventor TEXT
);