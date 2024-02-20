-- Insert departments into the department table
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
-- Insert roles into the role table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1),
       ("Salesperson", 80000.00, 1),
       ("Lead Engineer", 150000.00, 2),
       ("Software Engineer", 120000.00, 2),
       ("Account Manager", 160000.00, 3),
       ("Accountant", 125000.00, 3),
       ("Legal Team Lead", 250000.00, 4),
       ("Lawyer", 190000.00, 4);
-- Insert employees into the employee table       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe",1, null),
        ("Mike", "Chan",1, 1),
        ("Ashley", "Rodriguez",2, null),
        ("Kevin", "Tupik",2, 3),
        ("Kunal", "Singh",3, null),
        ("Malia", "Brown",3, 5),
        ("Sarah", "Lourd",4, null),
        ("Tom", "Allen",4, 7);
