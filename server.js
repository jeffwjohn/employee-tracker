// DEPENDENCIES
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Table = require('easy-table');
const {
    toDoQuestion,
    addDeptQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    updateEmployeeRoleQuestions
} = require('./public/lib/index.js');
const Department = require('./public/lib/Department');
const Role = require('./public/lib/Role');
const Font = require('ascii-art-font');
const chalk = require('chalk');
var deptArray = [];
var addRoleChoiceArray = [];
var addEmployeeChoiceArray = []; //maybe for sending to localStorage?


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
    console.log(chalk.bold.blue('Employee') + ' ' + chalk.bold.red('Manager!'));
    // Font.fontPath = 'Fonts';
    // Font.create('Employee Manager', 'Doom');
    mainMenu();
});

function mainMenu() {
    inquirer.prompt(toDoQuestion)
        .then(response => {

            switch (response.todo) {
                case ('View all departments'):
                    viewAllDepts();
                    break;
                case ('View all roles'):
                    viewAllRoles();
                    break;
                case ('View all employees'):
                    viewAllEmployees();
                    break;
                case ('Add a department'):
                    addDept();
                    break;
                case ('Add a role'):
                    addRole();
                    break;
                case ('Add an employee'):
                    addEmployee();
                    break;
                case ('Update an employee role'):
                    updateEmployeeRole();
                    break;
                case ('Test'):
                    testFunction();
                    break;
                case ('Exit \n'):
                    connection.end();
            }
        })
};

function testFunction() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log(res)
        var choicesArray = [];
        res.forEach(item => {
            choicesArray.push(item.title)
        })
        inquirer.prompt([{
            type: 'list',
            name: 'lsit',
            choices: choicesArray,
            message: "Choose wisely"
        }]).then(response => {
            console.log(response);
        })
    });

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
    connection.query('SELECT employee.id, employee.first_name AS `First Name`, employee.last_name AS `Last Name`, role.title AS `Job Title`, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON department.id = role.department_id', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

};

function addDept() {

    inquirer.prompt(addDeptQuestions)
        .then(answers => {

            connection.query('INSERT INTO department SET ?', {
                    name: answers.name

                },
                (err, res) => {
                    if (err) throw err;

                    var department = new Department(
                        answers.name,
                        res.insertId
                    );

                    // addRoleChoiceArray = addRoleQuestions[2].choices;
                    // addRoleChoiceArray.push(department);
                    addRoleQuestions[2].choices.push(department);
                    mainMenu();
                });
        })
};

function testFunction() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log(res);

        var choicesArray = [];
        res.forEach(item => {
            choicesArray.push(item.title)
        })
        inquirer.prompt([{
            type: 'list',
            name: 'lsit',
            choices: choicesArray,
            message: "Choose wisely"
        }]).then(response => {
            console.log(response);
        })
    });

};

function addRole() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(res);

        var deptArray = [];
        res.forEach(item => {
            var {id, name} = item;
            var item = {value: id, name};
            deptArray.push(item)
            var {value, name} = item;
            var item = {id: value, name};
            console.log(deptArray);
        })
        console.log(deptArray);
        inquirer.prompt([{
            type: 'input',
            name: 'role',
            message: 'Enter the role name.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the role name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary paid for this role.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the salary paid for the role you are creating!");
                    return false;
                }
            }
        },{
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: deptArray
            }])
            .then(answers => {
                    console.log(answers);
                    connection.query('INSERT INTO role SET ?', {
                            title: answers.role,
                            salary: answers.salary,
                            department_id: answers.department
                },

                (err, res) => {
                    if (err) throw err;

                    // var role = new Role(
                    //     answers.role,
                    //     answers.salary,
                    //     answers.department
                    // );

                    // addEmployeeQuestions[2].choices.push(role);
                    // updateEmployeeRoleQuestions[1].choices.push(role);
                    mainMenu();
                    // });
                })
            })
    })
};

function addEmployee() {
    inquirer.prompt(addEmployeeQuestions)
        .then(answers => {

            connection.query('INSERT INTO employee SET ?', {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.role,
                    manager_id: answers.manager
                },

                (err, res) => {
                    if (err) throw err;
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

// module.exports = deptArray;