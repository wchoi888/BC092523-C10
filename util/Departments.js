const db = require("../db/dbConfig");

class Department {
  constructor() {
    this.table = "department";
  }
  viewDept() {
    return db
      .promise()
      .query(`SELECT * FROM ${this.table} `)
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  addDept(details) {
    return db
      .promise()
      .query(
        `INSERT INTO ${this.table} (name) VALUES("${details.department}") `
      )
      .then(([results, fields]) => results)
      .catch((err) => {
        throw err;
      });
  }
  deleteDepartment(details) {
    return db
      .promise()
      .query(`DELETE FROM ${this.table} WHERE id = ${details.department}`)
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
  viewBudget(details) {
    return db
      .promise()
      .query(
        `SELECT SUM (tbl2.salary) AS total FROM employee AS tbl1 
        LEFT JOIN role as tbl2 ON tbl1.role_id=tbl2.id 
        LEFT JOIN  ${this.table} as tbl3 ON tbl2.department_id=tbl3.id 
        WHERE tbl2.department_id=${details.department}`
      )
      .then(([rows, fields]) => rows)
      .catch((err) => {
        throw err;
      });
  }
}
module.exports = Department;
