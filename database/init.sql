-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Do not rename username column, will; cause issues with passport


-- store the different color options
CREATE TABLE "colors" (
    "id" SERIAL PRIMARY KEY,
    "label" VARCHAR(80) NOT NULL,
    "hex_code" VARCHAR(6)
);

CREATE TABLE "levels" (
    "id" SERIAL PRIMARY KEY,
    "qualifier" BIGINT NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "securityLevel" int default 1 NOT NULL,
    "email" VARCHAR (80),
    "role" VARCHAR (80),
    "user_levels" INT default 0,
    "points" BIGINT default 0,
    "isActive" BOOLEAN default TRUE
);

CREATE TABLE "blocks" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "colors_id" BIGINT REFERENCES "colors"
);

CREATE TABLE "colors_user" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "colors_id" BIGINT REFERENCES "colors"
);
