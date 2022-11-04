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



-- -- Table: characteristics

DROP TABLE IF EXISTS characteristics;

CREATE TABLE IF NOT EXISTS characteristics
(
    id integer PRIMARY KEY UNIQUE,
    product_id integer,
    name text
);


ALTER TABLE IF EXISTS characteristics
    OWNER to angelacarrasco;
-- imports characteristics csv data into table
copy characteristics (id, product_id, name) FROM
 '/Users/angelacarrasco/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

-- Table: ratingschar

DROP TABLE IF EXISTS ratingschar;

CREATE TABLE IF NOT EXISTS ratingschar
(
    id serial PRIMARY KEY,
    characteristics_id integer,
    review_id integer,
    value integer
);


ALTER TABLE IF EXISTS ratingschar
    OWNER to angelacarrasco;
-- imports characteristic ratings csv data into table
copy ratingschar (id, characteristics_id, review_id, value) FROM
 '/Users/angelacarrasco/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';


-- -- Table: photos

DROP TABLE IF EXISTS photos;

CREATE TABLE IF NOT EXISTS photos
(
    id integer PRIMARY KEY,
    review_id integer,
    url text
);


ALTER TABLE IF EXISTS photos
    OWNER to angelacarrasco;
-- imports photos csv data into table
copy photos (id, review_id, url) FROM
 '/Users/angelacarrasco/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS reviews
(
    id serial NOT NULL PRIMARY KEY,
    product_id integer,
    rating integer,
    summary text,
    body text,
    recommend boolean,
    reported boolean,
    reviewer_name text,
    reviewer_email text,
    response text,
    helpfulness integer,
    date text,
    photos text[]
);


ALTER TABLE IF EXISTS reviews
    OWNER to angelacarrasco;
    -- imports review csv data into table
copy reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM
 '/Users/angelacarrasco/Downloads/reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

-- Add foreign keys
ALTER TABLE ratingschar ADD FOREIGN KEY (characteristics_id) REFERENCES characteristics (id);
ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);

-- CREATE INDEX ON PRODUCT ID AND REVIEW_ID ON PHOTOS
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_photos_review_id ON photos(review_id);

-- run this command to seed DB:   psql -U angelacarrasco -d Reviews < Schema.sql