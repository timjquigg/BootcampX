/* 
SELECT sum(duration) as total_duration
FROM assignment_submissions
WHERE student_id = (
  SELECT id
  FROM students
  WHERE name = 'Ibrahim Schimmel'
);
*/

SELECT sum(assignment_submissions.duration) as total_duration
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.name = 'Ibrahim Schimmel';