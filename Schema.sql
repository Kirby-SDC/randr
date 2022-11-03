-- All of this SQL code is from pgadmin. I populated the db that way. May need to run it
-- here though when I make the docker container


-- Database: Reviews
-- DROP DATABASE IF EXISTS "Reviews";

-- CREATE DATABASE "Reviews"
--     WITH
--     OWNER = angelacarrasco
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'C'
--     LC_CTYPE = 'C'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- COMMENT ON DATABASE "Reviews"
--     IS 'Will house all of. thedata needed for the ratings and reviews API for Atelier';

-- -- SCHEMA: public

-- DROP SCHEMA IF EXISTS public ;

-- CREATE SCHEMA IF NOT EXISTS public
--     AUTHORIZATION pg_database_owner;

-- COMMENT ON SCHEMA public
--     IS 'standard public schema';

-- GRANT USAGE ON SCHEMA public TO PUBLIC;

-- GRANT ALL ON SCHEMA public TO pg_database_owner;

DROP TABLE IF EXISTS public.reviews;

CREATE TABLE IF NOT EXISTS public.reviews
(
    product_id integer NOT NULL,
    review_id integer NOT NULL,
    date date,
    summary character varying COLLATE pg_catalog."default" NOT NULL,
    body character varying COLLATE pg_catalog."default" NOT NULL,
    recommend boolean,
    reported boolean,
    reviewer_name character varying COLLATE pg_catalog."default" NOT NULL,
    reviewer_email character varying COLLATE pg_catalog."default" NOT NULL,
    response character varying COLLATE pg_catalog."default",
    helpfulness integer,
    CONSTRAINT reviews_pkey PRIMARY KEY (review_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reviews
    OWNER to angelacarrasco;
    -- imports review csv data into table
copy public.reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM
 '/Users/angelacarrasco/Downloads/reviews.csv' DELIMITER ',' CSV HEADER QUOTE '\"' ESCAPE '''';

-- -- Table: public.characteristics

DROP TABLE IF EXISTS public.characteristics;

CREATE TABLE IF NOT EXISTS public.characteristics
(
    id integer,
    product_id integer,
    name text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.characteristics
    OWNER to angelacarrasco;
-- imports characteristics csv data into table
copy public.characteristics (id, product_id, name) FROM
 '/Users/angelacarrasco/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';
-- Table: public.ratingschar

DROP TABLE IF EXISTS public.ratingschar;

CREATE TABLE IF NOT EXISTS public.ratingschar
(
    id integer,
    characteristics_id integer,
    review_id integer,
    value integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ratingschar
    OWNER to angelacarrasco;
-- imports characteristic ratings csv data into table
copy ratingschar (id, characteristics_id, review_id, value) FROM
 '/Users/angelacarrasco/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';


-- -- Table: public.photos

DROP TABLE IF EXISTS public.photos;

CREATE TABLE IF NOT EXISTS public.photos
(
    id integer,
    review_id integer,
    url text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.photos
    OWNER to angelacarrasco;
-- imports photos csv data into table
copy public.photos (id, review_id, url) FROM
 '/Users/angelacarrasco/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';


