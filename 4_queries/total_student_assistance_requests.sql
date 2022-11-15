SELECT count(assistance_requests.*) as total_assistances, students.name as name
FROM assistance_requests 
JOIN students ON assistance_requests.student_id = students.id
WHERE name =  'Elliot Dickinson'
GROUP BY name;