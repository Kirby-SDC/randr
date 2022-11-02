-- Database: Reviews

CREATE TABLE IF NOT EXISTS randr.reviews
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

ALTER TABLE IF EXISTS randr.reviews
    OWNER to angelacarrasco;

