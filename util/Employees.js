const db = require("../db/dbConfig");

class Employees {
  constructor() {
    this.table = "employee";
  }
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
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
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
  deleteEmployee() {}
}
module.exports = Employees;
