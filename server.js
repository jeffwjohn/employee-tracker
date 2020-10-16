// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const viewAllDepts = require('./queries/depts');
const {addDeptQuestions} = require('./public/lib/index.js');
// const { startProgram } = require('./public/lib/index.js');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'class1234',
    database: 'company_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    mainMenu();
    // startProgram()
});

function mainMenu() {
    inquirer.prompt([{
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }])
        .then(response => {
            console.log(response)
            if (response.todo === 'View all departments') {
                viewAllDepts();
            } else if (response.todo === 'View all roles') {
                viewAllRoles();
            } else if (response.todo === 'View all employees') {
                viewAllEmployees();
            } else if (response.todo === 'Add a department') {
                addDept();
            }
        })
};

function viewAllDepts() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

function viewAllRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

function viewAllEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

function addDept() {
    inquirer.prompt(addDeptQuestions)
    .then(answers => {
        console.log(answers.addDept);
        connection.query('INSERT INTO department SET ?', 
             {name: answers.addDept},
        
            (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
    })
};



module.exports = {
    connection
};
// execute will internally call prepare and query
// connection.query(
//   'SELECT * FROM role',
//   function(err, results, fields) {
//     console.table(results); // results contains rows returned by server

//     // If you execute same statement again, it will be picked from a LRU cache
//     // which will save query preparation time and give better performance

//   }
// );