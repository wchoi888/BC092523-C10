// Import the mysql2 library
const mysql = require("mysql2");
// Create a connection object using mysql2
const config = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password1234",
    database: "employee_tracker",
  },
  // Callback function to handle connection success
  console.log(`Connected to the employee_tracker database.`)
);
// Export the config connection object for use in other files
module.exports = config;
