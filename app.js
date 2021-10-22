const express = require('express')
const app = express();
const students = require('./students.json');

app.use(express.json());

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

})