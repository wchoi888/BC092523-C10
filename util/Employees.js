const db = require("../db/dbConfig");

class Employees {
  constructor() {
    this.table = "employee";
  }
  // Method to view all employees with their details
  viewEmployees() {
    return db
      .promise()
      .query(
        `SELECT tbl1.id AS employee_id, tbl1.first_name, tbl1.last_name, tbl2.title, tbl2.salary, tbl3.name, CONCAT(tbl4.first_name, " ", tbl4.last_name) AS manager 
      FROM ${this.table} AS tbl1 
      JOIN ROLE AS tbl2 ON tbl1.role_id = tbl2.id
      LEFT JOIN DEPARTMENT AS tbl3 ON tbl2.department_id =tbl3.id 
      LEFT JOIN ${this.table} AS tbl4 ON tbl1.manager_id = tbl4.id`
      )
      .then(([rows, fields]) => rows) // Extract and return the rows from the result
      .catch((err) => {
        throw err;
      });
  }
  // Method to view employee names
  viewEmployeeName() {
    return db
      .promise()
      .query(
        `SELECT tbl1.id, CONCAT(tbl1.first_name, " ", tbl1.last_name) AS name 
      FROM ${this.table} AS tbl1`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to view managers
  viewManagers() {
    return db
      .promise()
      .query(
        `SELECT tbl1.id, CONCAT(tbl1.first_name, " ", tbl1.last_name) AS manager 
        FROM ${this.table} AS tbl1 
        LEFT JOIN ${this.table} AS tbl2 ON tbl1.manager_id = tbl2.id
        WHERE tbl1.manager_id IS NULL`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to add a new employee
  addEmployee(details) {
    if (details.manager === "") {
      details.manager = null;
    }
    return db
      .promise()
      .query(
        `INSERT INTO ${this.table} (first_name, last_name, role_id, manager_id) VALUE ("${details.firstName}", "${details.lastName}", ${details.role}, ${details.manager})`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to update an employee's role
  updateEmployeeRole(details) {
    return db
      .promise()
      .query(
        `UPDATE ${this.table} SET role_id=${details.role} WHERE id=${details.name}`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to update an employee's manager
  updateEmployeeManager(details) {
    return db
      .promise()
      .query(
        `UPDATE ${this.table} SET manager_id=${details.manager} WHERE id=${details.name}`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to view employee names by manager
  viewEmployeeNamebyManager(details) {
    return db
      .promise()
      .query(
        `SELECT tbl1.id, CONCAT(tbl1.first_name, " ", tbl1.last_name) AS name 
    FROM ${this.table} AS tbl1 WHERE manager_id=${details.manager}`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to view employees by department
  viewEmployeesbyDepartment(details) {
    return db
      .promise()
      .query(
        `SELECT tbl1.id, CONCAT(tbl1.first_name, " ", tbl1.last_name) AS name
    FROM ${this.table} AS tbl1 LEFT JOIN role as tbl2 ON tbl1.role_id=tbl2.id LEFT JOIN department as tbl3 ON tbl2.department_id=tbl3.id WHERE tbl2.department_id=${details.department}`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to delete an employee
  deleteEmployee(details) {
    return db
      .promise()
      .query(`DELETE FROM ${this.table} WHERE id = ${details.name}`)
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
}
// Export the Employees class for use in other files
module.exports = Employees;
