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

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const cohortName = process.argv[2];
const limit = process.argv[3];
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));