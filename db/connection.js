// Import the Sequelize library
const Sequelize = require("sequelize");

// Create a connection object
const sequelize = new Sequelize(
  // Database name
  "library_db",
  // User
  "root",
  // Password
  "F@cus1682023@@",
  {
    // Database location
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);
// Export the sequelize connection object for use in other files
module.exports = sequelize;
