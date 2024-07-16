CREATE DATABASE IF NOT EXISTS projet_api;
use projet_api;

-- Creating the table 
CREATE TABLE IF NOT EXISTS bookstate(
id_book INT unsigned NOT NULL AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,
author VARCHAR(50) NOT NULL,
state VARCHAR(50) NOT NULL,
PRIMARY KEY(id_book));

-- Inserting values in the table
-- Available state: PtR (Plan to Read), Reading, Read and Dropped only
INSERT INTO bookstate(name, author, state) VALUES ('The Name of the Wind', 'Patrick Rothfuss', 'Read');
INSERT INTO bookstate(name, author, state) VALUES ("The Wise Man's Fear", 'Patrick Rothfuss', 'PtR');
INSERT INTO bookstate(name, author, state) VALUES ("Door of Stone", 'Patrick Rothfuss', 'PtR');
INSERT INTO bookstate(name, author, state) VALUES ('The Lies of Locke Lamora', 'Scott Lynch', 'Reading');
INSERT INTO bookstate(name, author, state) VALUES ('Way of Kings', 'Brandon Sanderson', 'Read');
INSERT INTO bookstate(name, author, state) VALUES ('Word of Radiance', 'Brandon Sanderson', 'PtR');
INSERT INTO bookstate(name, author, state) VALUES ('The Final Empire', 'Brandon Sanderson', 'Read');
INSERT INTO bookstate(name, author, state) VALUES ('The Weel of Ascension', 'Brandon Sanderson', 'Read');
INSERT INTO bookstate(name, author, state) VALUES ('The Heroes of Ages', 'Brandon Sanderson', 'Dropped');
INSERT INTO bookstate(name, author, state) VALUES ('A Song of Ice and Fire 1', 'George R.R. Martin', 'PtR');
INSERT INTO bookstate(name, author, state) VALUES ('Prince of Thorns', 'Mark Lawrence', 'Read');
INSERT INTO bookstate(name, author, state) VALUES ('King of Thorns', 'Mark Lawrence', 'Read');
INSERT INTO bookstate(name, author, state) VALUES ('Emperor of Thorns', 'Mark Lawrence', 'Read');
INSERT INTO bookstate(name, author, state) VALUES ('Dune', 'Frank Herbert', 'PtR');
INSERT INTO bookstate(name, author, state) VALUES ('The Red Knight', 'Miles Cameron', 'PtR');


select * from bookstate;