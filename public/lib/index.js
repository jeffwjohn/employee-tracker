const mysql = require ('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { connection } = require('../../server');
// const viewAllDepts = require('../../queries/depts');
const Employee = require('./Employee');
const Role = require('./Role');
const Department = require('./Department');
const teamArray = [];


const toDoQuestion = [
    {
        type: 'list',
        name: 'todo',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role']
    }
];

const addDeptQuestions = [
    {
        type: 'input',
        name: 'addDept',
        message: 'Enter the name of the department.',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter the department name!");
                return false;
            }
        }
    }
];

const addRoleQuestions = [
    {
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
    },
    {
        type: 'list',
        name: 'department',
        message: 'What department does this role belong to?',
        choices: [{name: 'Sales', value: 1}, {name: 'Engineering', value: 2}, {name: 'Finance', value: 3}, {name: 'Legal', value: 4}]
    }
];

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name.",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter the employee's first name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name.",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter the employee's last name!");
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'role',
        message: "Enter the employee's role.",
        choices: ['Salesperson', 'Software Engineer', 'Accountant', 'Lawyer']
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: ['Jeff Johnston', 'Mandy Moore', 'James Bond', 'Matt Damon', 'No manager assigned']
    }
];

// const viewAllDepts = () => {
//     const query = connection.query('SELECT * FROM department',
    
//     function (err, res) {
//         if(err) throw err;
//         console.table(res);
//      });
    
// }

// Initialize program
// const startProgram = () => {
//     return inquirer.prompt(toDoQuestion).then(answers => {
//             return answers;
//         }).then(answers => {
//         if (answers.todo === 'View all departments') {
//             viewAllDepts();
//             return answers;
//     }
   
//     })
// };

// 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role'

// startProgram();

module.exports = {addDeptQuestions, addRoleQuestions};

    // addDeptQuestions,
    // addRoleQuestions,
    // addEmployeeQuestions
