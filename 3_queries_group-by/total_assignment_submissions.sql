SELECT cohorts.name as cohort, count(assignment_submissions.*) as total_submissions
FROM cohorts JOIN students on cohorts.id = students.cohort_id
JOIN assignment_submissions on students.id = assignment_submissions.student_id
GROUP BY cohorts.name
ORDER BY total_submissions DESC;