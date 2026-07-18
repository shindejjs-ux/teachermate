INSERT INTO boards (name)
VALUES ('CBSE');

INSERT INTO classes (board_id,class_name)
VALUES
(1,'Class 1'),
(1,'Class 2'),
(1,'Class 3'),
(1,'Class 4'),
(1,'Class 5'),
(1,'Class 6'),
(1,'Class 7'),
(1,'Class 8'),
(1,'Class 9'),
(1,'Class 10'),
(1,'Class 11'),
(1,'Class 12');
INSERT INTO subjects(class_id,subject_name)
SELECT id,'English' FROM classes;

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Mathematics' FROM classes;

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Hindi' FROM classes;

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Science'
FROM classes
WHERE id BETWEEN 6 AND 10;

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Social Science'
FROM classes
WHERE id BETWEEN 6 AND 10;

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Sanskrit'
FROM classes
WHERE id BETWEEN 6 AND 10;

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Physics'
FROM classes
WHERE id IN (11,12);

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Chemistry'
FROM classes
WHERE id IN (11,12);

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Biology'
FROM classes
WHERE id IN (11,12);

INSERT INTO subjects(class_id,subject_name)
SELECT id,'Computer Science'
FROM classes
WHERE id IN (11,12);
INSERT INTO books(subject_id,book_name)

SELECT id,
'NCERT ' || subject_name

FROM subjects;
