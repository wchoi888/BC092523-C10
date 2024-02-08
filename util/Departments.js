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
}
module.exports = Department;
