const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { connection } = require('../server');

const viewAllDepts = () => {
    const query = connection.query('SELECT * FROM department',
    
    function (err, res) {
        if(err) throw err;
        console.table(res);
     });
    
}

module.exports = viewAllDepts;