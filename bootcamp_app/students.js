// const { Pool } = require('pg');
// const pool = new Pool();

const { Pool } = require('pg');
// const process = ('process');


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const quaryString = `
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const limit = process.argv[3] || 5;
const cohortName = process.argv[2];
const values = [`%${cohortName}%`, limit];

pool.query(quaryString, values)
.then(res => {
  // console.log(res);
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));