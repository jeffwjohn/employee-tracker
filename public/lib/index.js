var deptArray = require('../../server')

const toDoQuestion = [{
    type: 'list',
    name: 'todo',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Test', 'Exit \n']
}];

const addDeptQuestions = [{
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department.',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log("Please enter the department name!");
            return false;
        }
    }
}];

const addEmployeeQuestions = [{
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
        choices: [{
            name: 'Sales Lead',
            value: 1
        },
        {
            name:'Lead Engineer',
            value: 2
        },
        {
            name: 'Lead Accountant',
            value: 3
        },
        {
            name: 'Legal Team Lead',
            value: 4
        },
        {
            name: 'Salesperson',
            value: 5
        }, 
        {
            name: 'Software Engineer',
            value: 6
        }, 
        {
            name: 'Accountant',
            value: 7
        }, 
        {
            name: 'Lawyer',
            value: 8
        }]
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: [{
            name: 'Jeff Johnston',
            value: 1
        }, {
            name: 'Mandy Moore',
            value: 2
        }, {
            name: 'James Bond',
            value: 3
        }, {
            name: 'Matt Damon',
            value: 4
        },{
            name: 'No manager assigned',
            value: null
        }]
    }
];

// const updateEmployeeRoleQuestions = [{
//     type: 'input',
//     name: 'employeeId',
//     message: 'Enter ID of employee to update.'
// },
// {
//     type: 'list',
//     name: 'role',
//     message: 'Choose new employee role.',
//     choices: roleArray
// }
// ]

module.exports = {
    toDoQuestion,
    addDeptQuestions,
    // addRoleQuestions,
    // addEmployeeQuestions
    // updateEmployeeRoleQuestions
};

