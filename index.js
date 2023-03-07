const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(globalMiddleware);
app.use(localMiddleware);

function globalMiddleware(req, res, next){
    console.log('Global Middleware');
    next();

}

function localMiddleware(req, res, next){
    console.log('Local Middleware');
    next();
   
}


app.get('/', function (req, res) {
    //console.log('Home Route');
    res.send('Students Data');
});


let students = [
    { id: 1, name: "Flora", age: 25, section:A, gpa: 3.5, nationality: "US" },
    { id: 2, name: "Lora", age: 22, section:D, gpa: 3.2, nationality: "Uk" },
    { id: 3, name: "Jessy", age: 24, section:A, gpa: 3.4, nationality: "Canada" },
    { id: 4, name: "Nissi", age: 21, section:B, gpa: 3.1, nationality: "India" },

];

//Retrieving all the students
app.get('/students', function (req, res) {
    res.send(students);
});

//Adding student

app.post('/students', function (req, res) {
    let student_data = req.body;
    students.push(student_data);
    res.send(student_data);
});

//Retriving a student with a specific id

app.get('/students/:student_id', function (req, res) {
    let studentId = parseInt(req.params.student_id);
    let student_data = students.find(function (item) {
        return item.id === studentId;
    });

    res.send(student_data);

});

//Updating a student record

app.put('/students/:student_id', function (req, res) {
    let student_id = parseInt(req.params.student_id);

    let student_data = req.body;
    let index = students.findIndex(function (item) {
        return item.id === student_id;
    });

    students[index] = student_data;

    res.send(student_data);

});

//Deleting a student

app.delete('/students/:student_id', function (req, res) {
    let student_id = parseInt(req.params.student_id);

    let index = students.findIndex(function (item) {
        return item.id === student_id;
    });

    let removedStudent = students.splice(index, 1);

    res.send(removedStudent);


});




app.listen(3000, function () {
    console.log('Server is running on port 3000...')
});