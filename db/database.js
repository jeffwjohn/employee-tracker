// const mysql = require('mysql2').verbose();

// // Connect to database
// const db = new mysql.Database('./db/company.db', err => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the election database.');
//   });

// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: 'class1234',
  database: 'company_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
})
 
// execute will internally call prepare and query
connection.execute(
  'SELECT * FROM role',
  function(err, results, fields) {
    console.log('Results:', results); // results contains rows returned by server
    console.log('Fields:', fields); // fields contains extra meta data about results, if available
 
    // If you execute same statement again, it will be picked from a LRU cache
    // which will save query preparation time and give better performance
  }
);

  module.exports = connection;