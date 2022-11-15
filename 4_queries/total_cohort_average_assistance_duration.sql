SELECT AVG(total_duration) as average_total_duration
FROM (
  SELECT cohorts.name, sum(assistance_requests.completed_at - assistance_requests.started_at) as total_duration
  FROM assistance_requests
  JOIN students on student_id = students.id
  JOIN cohorts on students.cohort_id = cohorts.id
  GROUP BY cohorts.name) as total_duration;