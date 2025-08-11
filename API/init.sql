CREATE TABLE IF NOT EXISTS Trashcans (
    id SERIAL PRIMARY KEY,
    is_full BOOLEAN,
    date_time TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Users (
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(100)
);

INSERT INTO Users (firstName, lastName, email, password)
VALUES
('admin', 'admin', 'admin@gmail.com', '$2a$12$E0eulLa7CpFtCpFlT666UuJGZuLdsocdMw8tL1R2G69gvpzPbuqVa');

Insert INTO Trashcans (is_full, sate_time) 
VALUES (false, CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris');