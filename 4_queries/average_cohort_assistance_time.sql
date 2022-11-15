SELECT cohorts.name, avg(assistance_requests. completed_at - assistance_requests.started_at) as average_assistance_time
FROM assistance_requests
JOIN students on student_id = students.id
JOIN cohorts on students.cohort_id = cohorts.id
GROUP BY cohorts.name
ORDER BY 2 ASC;