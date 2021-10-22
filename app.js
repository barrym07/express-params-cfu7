const express = require('express')
const app = express();
const students = require('./students.json');

const port = 3000;
app.listen(port, () => console.log(`Students app listening at http://localhost:${port}`));

app.get('/students', (req, res) => res.send(students));


