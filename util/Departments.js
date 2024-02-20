// Import the database connection object
const db = require("../db/dbConfig");

// Department class definition
class Department {
  constructor() {
    this.table = "department";
  }
  // Method to view all departments
  viewDept() {
    return db
      .promise()
      .query(`SELECT * FROM ${this.table} `) // Query to select all departments
      .then(([rows, fields]) => rows) // Extract and return the rows from the result
      .catch((err) => {
        throw err; // Throw any errors encountered during the query
      });
  }
  // Method to add a new department
  addDept(details) {
    return db
      .promise()
      .query(
        `INSERT INTO ${this.table} (name) VALUES("${details.department}") ` // Query to insert a new department
      )
      .then(([results, fields]) => results) // Extract and return the results from the query
      .catch((err) => {
        throw err; // Throw any errors encountered during the query
      });
  }
  // Method to delete a department
  deleteDepartment(details) {
    return db
      .promise()
      .query(`DELETE FROM ${this.table} WHERE id = ${details.department}`) // Query to delete a department
      .then(([rows, fields]) => rows) // Extract and return the rows from the result
      .catch((err) => {
        throw err;
      });
  }
  // Method to view the total budget of a department
  viewBudget(details) {
    return db
      .promise()
      .query(
        `SELECT SUM (tbl2.salary) AS total FROM employee AS tbl1 
        LEFT JOIN role as tbl2 ON tbl1.role_id=tbl2.id 
        LEFT JOIN  ${this.table} as tbl3 ON tbl2.department_id=tbl3.id 
        WHERE tbl2.department_id=${details.department}`
      ) // Query to calculate the total budget of a department
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
}

// Export the Department class for use in other files
module.exports = Department;
