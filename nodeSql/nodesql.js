const express = require('express');
const mysql = require('mysql');
//const bodyParser = require('body-parser');

//create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodemysql2',
    port     : '8889'
});

//connect
db.connect((err)=>{
    if(err)
    {
        console.log("Connection Failed.....");
        throw err;
    }
    console.log('connected.');
});

const app = express();

//create Databse
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql2';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database Created....');
    });
});

//Create Table
app.get('/createtable', (req, res)=>{
    let sql = 'CREATE TABLE posts (id INT(6) AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, email VARCHAR(50))';

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table Created Sucessfully...');
    });
});

//Insert Data
app.get('/insertdata', (req, res)=>{
    let sql = 'INSERT INTO posts (firstname, lastname, email) VALUES ("Harsh", "Patel", "harsh123@xyz.com")';

    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Insert Sucessfully...');
    });
});

//Select data
app.get('/selectdata', (req, res) => {
    let sql = 'SELECT * from posts';

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Records display Sucessfully...');
    });
});

//Select single data
app.get('/selectdata/:id', (req, res) => {
    let sql = `SELECT * from posts WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Record of id ${req.params.id} display Sucessfully...`);
    });
});

//Update data
app.get('/updatedata/:id', (req, res) => {
    let sql = `UPDATE posts SET lastname = 'Shah' WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Record of id ${req.params.id} Updated Sucessfully...`);
    });
});

//Delete data
app.get('/deletedata/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Record of id ${req.params.id} Deleted Sucessfully...`);
    });
});

app.listen('3000',()=>{
    console.log("Server started on port 3000...")
})