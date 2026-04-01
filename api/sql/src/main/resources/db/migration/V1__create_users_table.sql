CREATE TABLE users (
    id          BIGSERIAL    PRIMARY KEY,
    first_name  TEXT         NOT NULL,
    last_name   TEXT         NOT NULL,
    email       TEXT         NOT NULL UNIQUE,
    date_of_birth DATE       NOT NULL,
    department  TEXT         NOT NULL,
    role        TEXT         NOT NULL
);
