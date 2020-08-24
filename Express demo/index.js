//use joi version 13.1.0
const Joi = require('joi');                 //import joi module for validation user input and it retun class so the variable name start with 'J'.
const express = require('express');         //import Express module
const { join } = require('path');
const app = express();                       //store  Express objects in app

app.use(express.json()); 
                                          
const courses = [
    {id : 1, name : "Node.js"},
    {id : 2, name : "Express.js"},
    {id : 3, name : "JavaScript"}
]

app.get('/', (req,res)=>{                    //There will be two arguments First is URL, here /(route), Second is callback function.
    res.send('Hello World!!!');
});                                        

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

//:id define to get selected id data. example of single perameter.

app.get('/api/courses/:id',(req,res)=>{
    //res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The Course with given ID was not found.');
    res.send(course);
});

//multiple perameters

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);                   // It will displays both year and month in bcz will just called params.
});

//query string parameters to provide additional data or specific data with condition.
//It also store in an object with bunch of key and value pairs.

app.get('/api/posts/:year/:month/:day',(req,res)=>{
    res.send(req.query); 
});

// Let's CREATE or ADD a new course in the courses array through post method.

app.post('/api/courses',(req,res)=>{

    //Validation to check the name input is correct.

    // if(!req.body.name || req.body.name.length < 3 )
    // {
    //     //400 Bad Request
    //     res.status(400).send('Name is required and should be minimum 3 characters.');
    //     return;
    // }

    //insted of manual validation use joi package.
    // Also we can use validateCourse() function like we use in put method.

    const schema = { name : Joi.string().min(3).required()};           

    const result = Joi.validate(req.body, schema);

    if (result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course_add = {
        id : courses.length + 1,    // increment in ID
        name: req.body.name         // get course name form HTTP request body.
    };
    courses.push(course_add);       //push new course to the array.
    res.send(course_add);           // return the added course to known id and couse name
});


//Let's UPDATE the course and to do that use PUT method

app.put('/api/courses/:id',(req,res)=>{

    //Look up the course
    //If not existing, return 404

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The Course with given ID was not found.');
    
    //Validate
    //If invalide, return 400-Bad request

    //using  it by validateCourse function

    //const result = validateCourse(req.body);            // use function
    // const { error } = validateCourse(req.body);         //result.error its called Object destruction.

    // if (error)
    // {
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }

    const schema = { name : Joi.string().min(3).required()};          
    const result = Joi.validate(req.body, schema);

    if (result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Update the course
    //Return the Updated course

    course.name = req.body.name;
    res.send(course);
})

//defin a  function to use joi validation again and again and reduce line of code.
function validateCourse(course)
{
    const schema = { name : Joi.string().min(3).required() };
    const result = Joi.validate(course, schema); 
}

// Let's delete the course

app.delete('/api/courses/:id', (req,res)=>{
    
    //look up the course
    //Not,existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The Course with given ID was not found.');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the same course
    res.send(course)
})


// app.listen(3000,()=> console.log('Listening to port 3000...')); //We assign hardcore port number(Arbitrary).

const port = process.env.PORT || 3000;  // environment created than run on that port else run on 3000.
app.listen(port,()=> console.log(`Listening to port ${port}...`));

