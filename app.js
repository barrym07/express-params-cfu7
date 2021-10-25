const express = require('express')
const { uniqueId } = require(lodash)
const app = express();
const students = require('./students.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, () => console.log(`Students app listening at http://localhost:${port}`));



app.get('/students', (req, res) => {
  // GET /students - returns a list of all students
  // this endpoint, optionally, accepts query parameters
  // GET /students?search=<query> - returns a list of students filtered on name matching the given query
  if (req.query.search) {
    let name = decodeURIComponent(req.query.search);
    let result = students.filter(student => student.name.includes(name))
    res.send(result)
  } else {
    res.send(students)
  }
});

//GET /students/:studentId - returns details of a specific student by student id
app.get('/students/:studentId', (req, res) => {
  let stu = req.params.studentId;
  res.send(students.find(student => student.studentId === +stu))
});

//GET /grades/:studentId - returns all grades for a given student by student id
app.get('/grades/:studentId', (req, res) => {
  let grds = req.params.studentId;
  res.send(students.find(student => student.studentId === +grds).grades)
});

//POST /grades - records a new grade, returns success status in JSON response (meaning you do not need to actually store the grade in a database. You do need to validate that the user supplied at least a grade, and a studentId)

app.post('/grades', (req, res) => {
  let studentId = req.body.studentId;
  let grades = JSON.parse(req.body.grades);

  if (!studentId || !grades) {
    res.status(400);
    res.json("You didn't provide what I expected")

  } else {
    students[studentId].grades.push(grades);
    res.send("Student record updated")
  }
});

app.post('/register', (req, res) => {
  const newId = uniqueId();
  const student = req.body;
  student.id = newId;
  student.grades = [];
  students[newId] = student;
  res.send("Student added to database");
})