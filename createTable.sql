
CREATE TABLE IF NOT EXISTS users ( 
   user_id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (50) NOT NULL,
   email VARCHAR (355) UNIQUE NOT NULL
);
INSERT INTO users(username, password, email) values ('gris', 'secret', 'salty@salt.com');
INSERT INTO users(username, password, email) values ('gris1', 'secret', 'salty1@salt.com');
INSERT INTO users(username, password, email) values ('gris2', 'secret', 'salty2@salt.com');
INSERT INTO users(username, password, email) values ('gris3', 'secret', 'salty3@salt.com');
INSERT INTO users(username, password, email) values ('gris4', 'secret', 'salty4@salt.com');
INSERT INTO users(username, password, email) values ('gris5', 'secret', 'salty5@salt.com');
INSERT INTO users(username, password, email) values ('gris6', 'secret', 'salty6@salt.com');
