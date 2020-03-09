-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Do not rename username column, will; cause issues with passport
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "firstName" VARCHAR (30),
    "lastName" VARCHAR (30),
    "securityLevel" int default 1,
    "email" VARCHAR (80),
    "role" VARCHAR (80)
);