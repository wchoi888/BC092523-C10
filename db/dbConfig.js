const mysql = require("mysql2");
const config = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password1234",
    database: "employee_tracker",
  },
  console.log(`Connected to the employee_tracker database.`)
);
module.exports = config;
