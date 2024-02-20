const db = require("../db/dbConfig");

class Roles {
  constructor() {
    this.table = "role";
  }
  // Method to retrieve employee roles with their associated departments
  viewEmployeeRoles() {
    return db
      .promise()
      .query(
        `SELECT tbl1.id, tbl1.title, tbl1.salary, tbl2.name 
      FROM ${this.table} AS tbl1
      JOIN DEPARTMENT AS tbl2 ON tbl1.department_id =tbl2.id`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to retrieve all roles
  viewAllRoles() {
    return db
      .promise()
      .query(
        `SELECT title, id 
      FROM ${this.table}`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to add a new role
  addRole(details) {
    return db
      .promise()
      .query(
        `INSERT INTO ${this.table} (title, salary, department_id) VALUES ("${details.role}", "${details.salary}", ${details.department})`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  // Method to delete a role
  deleteRole(details) {
    return db
      .promise()
      .query(`DELETE FROM ${this.table} WHERE id = ${details.role}`)
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Roles;
