// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Table = require('easy-table');
const {
    addDeptQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    updateEmployeeRoleQuestions
} = require('./public/lib/index.js');
const Department = require('./public/lib/Department');


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
    console.log("\n Employee Manager \n");
    mainMenu();
});

function mainMenu() {
    inquirer.prompt([{
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit \n']
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
            } else if (response.todo === 'Add a role') {
                addRole();
            } else if (response.todo === 'Add an employee') {
                addEmployee();
            } else if (response.todo === 'Update an employee role') {
                updateEmployeeRole();
            } else {
                connection.end();
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

const addDept = () => {
    inquirer.prompt(addDeptQuestions)
        .then(answers => {
            console.log(answers.addDept);
            connection.query('INSERT INTO department SET ?', {
                    name: answers.addDept

                },

                (err, res) => {
                    if (err) throw err;
                    console.log(res);
                    console.log(answers.name, res.insertId);
                    console.log('Answers:', answers);
                    this.department = new Department(
                        answers.addDept,
                        res.insertId
                    );
                    console.log(this.department);
                    choiceA
                    addRoleQuestions[2].choices.push(this.department);
                    console.log(addRoleQuestions);
                    viewAllDepts();
                    mainMenu();
                });
        })
};

function addRole() {
    inquirer.prompt(addRoleQuestions)
        .then(answers => {
            console.log(answers);
            connection.query('INSERT INTO role SET ?', {
                    title: answers.role,
                    salary: answers.salary,
                    department_id: answers.department
                },

                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    mainMenu();
                });
        })
};

function addEmployee() {
    inquirer.prompt(addEmployeeQuestions)
        .then(answers => {
            console.log(answers);
            connection.query('INSERT INTO employee SET ?', {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.role,
                    manager_id: answers.manager
                },

                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    mainMenu();
                });
        })
};

function updateEmployeeRole() {

    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        var t = new Table;
        res.forEach(employee => {
            t.cell('Employee ID', employee.id)
            t.cell('first name', employee.first_name)
            t.cell('last name', employee.last_name)
            t.newRow()
        })
        console.log(t.toString())

        inquirer.prompt(updateEmployeeRoleQuestions)
            .then(answers => {
                console.log(answers);
                connection.query('UPDATE employee SET role_id = ? WHERE id = ?',
                    [answers.role, answers.employeeId],

                    (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        mainMenu();
                    }
                )

            })

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