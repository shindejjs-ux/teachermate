DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS chapters CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS boards CASCADE;

CREATE TABLE boards (
    id BIGSERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE classes (
    id BIGSERIAL PRIMARY KEY,
    board_id BIGINT REFERENCES boards(id),
    class_name TEXT NOT NULL
);

CREATE TABLE subjects (
    id BIGSERIAL PRIMARY KEY,
    class_id BIGINT REFERENCES classes(id),
    subject_name TEXT NOT NULL
);

CREATE TABLE books (
    id BIGSERIAL PRIMARY KEY,
    subject_id BIGINT REFERENCES subjects(id),
    book_name TEXT NOT NULL
);

CREATE TABLE chapters (
    id BIGSERIAL PRIMARY KEY,
    book_id BIGINT REFERENCES books(id),
    chapter_no INT,
    chapter_name TEXT
);

CREATE TABLE resources (
    id BIGSERIAL PRIMARY KEY,
    chapter_id BIGINT REFERENCES chapters(id),
    type TEXT,
    title TEXT,
    url TEXT
);