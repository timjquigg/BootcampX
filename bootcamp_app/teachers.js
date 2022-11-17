require('dotenv').config();
const { Pool } = require('pg');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB,
};

const pool = new Pool(dbConfig);

pool.connect()
  .then(() => {
    console.log(`Connected to database: ${dbConfig.database} on host: ${dbConfig.host}\n-----------------------------------------------------`);
  }).catch((error) => {
    console.log(`Connection Error: ${error}`);
  });

const cohort = process.argv[2];

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers on teacher_id = teachers.id
JOIN students on student_id = students.id
JOIN cohorts on students.cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${cohort}%'
ORDER BY teacher;
`)
  .then(res => {
    res.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${teacher.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack));