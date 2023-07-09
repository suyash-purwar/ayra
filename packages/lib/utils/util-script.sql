-- SELECT * FROM lecture;

SELECT L.ID,
	SECTION,
	CS.COURSE_ID,
	SUB.SUBJECT_CODE,
	SEMESTER,
	DAY,
	HS.SLOT,
	FACULTY_ID
FROM LECTURE L
JOIN COURSE_SUBJECT CS ON L.COURSE_SUBJECT_ID = CS.ID
JOIN SECTION S ON L.SECTION_ID = S.ID
JOIN SUBJECT SUB ON SUB.ID = CS.SUBJECT_ID
JOIN HOUR_SLOT HS ON HS.ID = L.HOUR_SLOT_ID
ORDER BY DAY,
	HS.ID;

-- DB has 10 sections
-- Each section is a group of students of the same semester and course
-- Course Subject contains the mapping between various courses and subjects
-- As of now 3/10 sections are mapped with course_work table (Lecture table)
-- Now, this lecture table is mapped with

SELECT L.ID,
	SECTION,
	CS.SEMESTER,
	SECTION_ID,
	SUBJECT_CODE,
	DAY,
	SLOT,
	COURSE_ID
FROM LECTURE L
JOIN SECTION ON SECTION.ID = L.SECTION_ID
JOIN HOUR_SLOT HS ON HS.ID = L.HOUR_SLOT_ID
JOIN COURSE_SUBJECT CS ON CS.ID = L.COURSE_SUBJECT_ID
JOIN SUBJECT ON CS.SUBJECT_ID = SUBJECT.ID
ORDER BY SECTION,
	DAY,
	SLOT;

-- I don't think we need timetable table
-- Mapping can exist between Student Table's section_id and Lecture Table's section_id

SELECT REGISTRATION_NO,
	SEMESTER,
	COURSE_SUBJECT_ID,
	S.SECTION_ID,
	COURSE_ID
FROM STUDENT S
LEFT JOIN LECTURE L ON S.SECTION_ID = L.SECTION_ID
ORDER BY REGISTRATION_NO;

-- To get result of every student

SELECT S.ID,
	REGISTRATION_NO,
	FIRST_NAME,
	SUBJECT_CODE,
	GRADE,
	CREDIT,
	CS.SEMESTER,
	S.SEMESTER AS CURRENT_SEMESTER
FROM STUDENT S
JOIN RESULT R ON R.STUDENT_ID = S.ID
JOIN COURSE_SUBJECT CS ON CS.ID = R.COURSE_SUBJECT_ID
JOIN SUBJECT SUB ON SUB.ID = CS.SUBJECT_ID
ORDER BY S.ID,
	SEMESTER;

-- Fetches the list of lecture person is attending in the current sem

SELECT S.ID,
	REGISTRATION_NO,
	FIRST_NAME,
	L.ID AS LECTURE_ID,
	CS.ID AS COURSE_SUBJECT_ID,
	DAY
FROM STUDENT S
JOIN LECTURE L ON L.SECTION_ID = S.SECTION_ID
JOIN COURSE_SUBJECT CS ON L.COURSE_SUBJECT_ID = CS.ID
WHERE S.ID = 5;

-- Fetches the subject of the current semester

SELECT S.ID,
	REGISTRATION_NO,
	CS.ID AS COURSE_SUBJECT_ID,
	CS.SEMESTER
FROM STUDENT S
JOIN COURSE_SUBJECT CS ON S.COURSE_ID = CS.COURSE_ID
WHERE S.ID = 3
	AND CS.SEMESTER = S.SEMESTER;
	
SELECT * FROM student ORDER BY id;
SELECT * FROM tgpa;

-- Fetches the today's attendance of student of a particular day of a week
SELECT 
	S.ID,
	A.LECTURE_ID,
	SUB.SUBJECT_CODE,
	A.STATUS,
	DAY,
	HS.SLOT,
	DATE
FROM STUDENT S
JOIN ATTENDANCE A ON A.STUDENT_ID = S.ID
JOIN LECTURE L ON L.ID = A.LECTURE_ID
JOIN COURSE_SUBJECT CS ON CS.ID = L.COURSE_SUBJECT_ID
JOIN SUBJECT SUB ON SUB.ID = CS.ID
JOIN HOUR_SLOT HS ON HS.ID = L.HOUR_SLOT_ID
WHERE S.ID=1 AND DAY='1'
ORDER BY HS.ID;

SELECT * FROM COURSE_SUBJECT;

-- Fetches the overall attendance of a student in current semester
SELECT 
	s.id AS student_id,
	cs.id AS course_subject_id,
	subject_code,
	attendance,
	cs.semester
FROM student s
JOIN overall_attendance oa ON oa.student_id = s.id
JOIN course_subject cs ON cs.id = oa.course_subject_id
JOIN subject sub ON sub.id = cs.subject_id
WHERE cs.semester = s.semester AND s.id=4;

-- See the timetabe of every student;

SELECT 
	s.id AS student_id,
	l.id AS lecture_id,
	sub.subject_code,
	day,
	slot
FROM student s
JOIN lecture l ON s.section_id = l.section_id
JOIN course_subject cs ON l.course_subject_id = cs.id
JOIN subject sub ON sub.id = cs.subject_id
JOIN hour_slot hs ON hs.id = l.hour_slot_id
WHERE s.id=3
ORDER BY day, hs.id;

-- 	Find teachers for this semester
SELECT 
	DISTINCT subject_code, cs.id AS course_subject_id, f.first_name, f.middle_name, f.last_name, f.contact, cs.semester
FROM student s
JOIN lecture l ON l.section_id = s.section_id
JOIN course_subject cs ON l.course_subject_id = cs.id
JOIN faculty f ON l.faculty_id = f.id
JOIN subject sub ON sub.id = cs.subject_id
WHERE s.id=1;

SELECT 
	l.id AS lecture_id,
	cs.id AS course_lecure_id,
	sub.subject_code,
	f.id AS faculty_id,
	l.section_id
FROM lecture l
JOIN course_subject cs ON l.course_subject_id = cs.id
JOIN subject sub ON sub.id = cs.subject_id
JOIN faculty f ON l.faculty_id = f.id;


-- Find result of every student
SELECT 
	cs.semester,
	subject_code,
	grade
FROM result r
JOIN student s ON s.id = r.student_id
JOIN course_subject cs ON cs.id = r.course_subject_id
JOIN subject sub ON sub.id = cs.subject_id
WHERE s.id=1
ORDER BY semester;

-- SELECT * FROM result;
SELECT
  registration_no,
  first_name,
  middle_name,
  last_name,
  session,
  c.course_code,
  semester,
  father_name,
  mother_name
FROM student s
JOIN course c ON s.course_id = c.id
WHERE registration_no IN (12100435, 11937798, 12276829)
ORDER BY s.id
LIMIT 10
OFFSET 0;

