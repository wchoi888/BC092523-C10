const inquirer = require("inquirer");
const Employee = require("./util/Employees");
const Department = require("./util/Departments");
const Role = require("./util/Roles");
// Function to prompt the user for actions
async function userPrompt() {
  // Prompt the user with a list of actions
  const response = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Manager",
        "Update Employee Role",
        "View all roles",
        "Add Role",
        "View all departments",
        "Add department",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "View Consolidated Budget by Department",
        "Quit",
      ],
    },
  ]);
  // Initialize instances of classes for actions
  let deptAction = new Department();
  let roleAction = new Role();
  let questions;
  let data;
  let employeeAction = new Employee();
  // Array to store department names and IDs
  let departmentList = [];
  // Retrieve all departments and populate departmentList
  const allDept = await deptAction.viewDept();
  for (let i = 0; i < allDept.length; i++) {
    departmentList.push({ name: allDept[i].name, value: allDept[i].id });
  }
  // Array to store employee names and IDs
  let employeeOption = [];
  // Retrieve all employees and populate employeeOption
  const employeeArray = await employeeAction.viewEmployeeName();
  for (let i = 0; i < employeeArray.length; i++) {
    employeeOption.push({
      name: employeeArray[i].name,
      value: employeeArray[i].id,
    });
  }
  // Array to store role titles and IDs
  let roleList = [];
  // Retrieve all roles and populate roleList
  let roleArray = await roleAction.viewAllRoles();
  for (let i = 0; i < roleArray.length; i++) {
    roleList.push({
      name: roleArray[i].title,
      value: roleArray[i].id,
    });
  }
  // Array to store manager names and IDs
  let managerList = ["none"];
  let managerArray = await employeeAction.viewManagers();
  for (let i = 0; i < managerArray.length; i++) {
    managerList.push({
      name: managerArray[i].manager,
      value: managerArray[i].id,
    });
  }
  // Switch statement to handle different user actions
  switch (response.action) {
    case "View all departments":
      console.log("\nid Department\n-- ---------\n");
      const departments = await deptAction.viewDept();
      for (let i = 0; i < departments.length; i++) {
        console.log(departments[i].id + " " + departments[i].name);
      }
      break;
    case "Add department":
      // Prompt user to add a new department
      questions = [
        {
          type: "input",
          name: "department",
          message: "What department would you like to add?",
        },
      ];
      data = await inquirer.prompt(questions);
      await deptAction.addDept(data);
      console.log(`Added ${data.department} to the database`);
      break;

    case "View all roles":
      // Display all roles with department information
      console.log(
        "\nid title \t\tdepartment\tsalary\n-- -------------\t-----------\t---------\n"
      );
      const roles = await roleAction.viewEmployeeRoles();
      for (let i = 0; i < roles.length; i++) {
        console.log(
          roles[i].id +
            " " +
            roles[i].title +
            "\t\t" +
            roles[i].name +
            "\t" +
            roles[i].salary
        );
      }
      break;
    case "Add Role":
      // Prompt user to add a new role
      questions = [
        {
          type: "input",
          name: "role",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does the role belong to?",
          choices: departmentList,
        },
      ];
      data = await inquirer.prompt(questions);
      await roleAction.addRole(data);
      console.log(`Added ${data.role} to the database`);
      break;
    case "View All Employees":
      console.log(
        "\nid firstname\tlastname\ttitle\t\t\tdepartment\tsalary\t\tmanager\n-- ---------\t--------\t-----\t\t\t----------\t------\t\t----------\n"
      );
      const employeeList = await employeeAction.viewEmployees();
      for (let i = 0; i < employeeList.length; i++) {
        console.log(
          employeeList[i].employee_id +
            " " +
            employeeList[i].first_name +
            "\t\t" +
            employeeList[i].last_name +
            "\t\t" +
            employeeList[i].title +
            "\t\t" +
            employeeList[i].name +
            "\t\t" +
            employeeList[i].salary +
            "\t" +
            employeeList[i].manager
        );
      }

      break;
    case "Add Employee":
      questions = [
        {
          type: "input",
          name: "firstName",
          message: "What is the first name of the employee?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the last name of the employee?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: roleList,
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the employee's manager?",
          choices: managerList,
        },
      ];
      data = await inquirer.prompt(questions);
      await employeeAction.addEmployee(data);
      console.log(`Added ${data.firstName} to the database`);
      break;
    case "Update Employee Role":
      questions = [
        {
          type: "list",
          name: "name",
          message: "Whose employee role are you updating?",
          choices: employeeOption,
        },
        {
          type: "list",
          name: "role",
          message: "What is the new role you wish to assign?",
          choices: roleList,
        },
      ];
      data = await inquirer.prompt(questions);
      await employeeAction.updateEmployeeRole(data);
      console.log(` The role is updated to the database`);
      break;
    case "Update Employee Manager":
      questions = [
        {
          type: "list",
          name: "name",
          message: "Whose employee manager are you updating?",
          choices: employeeOption,
        },
        {
          type: "list",
          name: "manager",
          message:
            "Who is the new manager you wish to assign to this employee?",
          choices: managerList,
        },
      ];
      data = await inquirer.prompt(questions);
      await employeeAction.updateEmployeeManager(data);
      console.log(` The manager is updated to the database`);
      break;
    case "View Employees by Manager":
      questions = [
        {
          type: "list",
          name: "manager",
          message: "Who is the manager you wish to display employees?",
          choices: managerList,
        },
      ];
      data = await inquirer.prompt(questions);
      const employeebyManager = await employeeAction.viewEmployeeNamebyManager(
        data
      );
      for (let i = 0; i < employeebyManager.length; i++) {
        console.log(employeebyManager[i].name + "\n");
      }

      break;
    case "View Employees by Department":
      questions = [
        {
          type: "list",
          name: "department",
          message: "Which department you wish to display employees?",
          choices: departmentList,
        },
      ];
      data = await inquirer.prompt(questions);
      const employeesbyDepartment =
        await employeeAction.viewEmployeesbyDepartment(data);
      for (let i = 0; i < employeesbyDepartment.length; i++) {
        console.log(employeesbyDepartment[i].name + "\n");
      }

      break;
    case "Delete Employee":
      questions = [
        {
          type: "list",
          name: "name",
          message: "Which employee do you want to delete?",
          choices: employeeOption,
        },
      ];
      data = await inquirer.prompt(questions);
      await employeeAction.deleteEmployee(data);
      console.log(` The employee has been deleted in the database`);
      break;
    case "Delete Role":
      questions = [
        {
          type: "list",
          name: "role",
          message: "Which role do you want to delete?",
          choices: roleList,
        },
      ];
      data = await inquirer.prompt(questions);
      await roleAction.deleteRole(data);
      console.log(` The role has been deleted in the database`);
      break;
    case "Delete Department":
      questions = [
        {
          type: "list",
          name: "department",
          message: "Which department do you want to delete?",
          choices: departmentList,
        },
      ];
      data = await inquirer.prompt(questions);
      await deptAction.deleteDepartment(data);
      console.log(` The department has been deleted in the database`);
      break;
    case "View Consolidated Budget by Department":
      questions = [
        {
          type: "list",
          name: "department",
          message: "Which department you wish to display budget?",
          choices: departmentList,
        },
      ];
      data = await inquirer.prompt(questions);
      const budget = await deptAction.viewBudget(data);
      for (let i = 0; i < budget.length; i++) {
        console.log(budget[i].total + "\n");
      }

      break;
    // Other cases handling employee actions
    case "Quit":
      console.log("Goodbye");
      break;
    default:
      console.error("Invalid selection");
      return;
  }
  if (response.action !== "Quit") {
    userPrompt();
  }
}
// Start the prompt
userPrompt();
