-- Drop the employee_tracker database if it exists
DROP DATABASE IF EXISTS employee_tracker;
-- Create the employee_tracker database
CREATE DATABASE employee_tracker;
-- Use the employee_tracker database
USE employee_tracker;


-- Create the department table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
-- Create the role table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
-- Create the employee table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  -- Define foreign key constraints 
  FOREIGN KEY(role_id) REFERENCES role(id), 
  FOREIGN KEY(manager_id) REFERENCES employee(id)
  ON DELETE SET NULL
);