const inquirer = require("inquirer");
const Employee = require("./util/Employees");
const Department = require("./util/Departments");
const Role = require("./util/Roles");
async function userPrompt() {
  const response = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee",
        "Update Employee Role",
        "View all roles",
        "Add Role",
        "View all departments",
        "Add department",
        "Quit",
      ],
    },
  ]);

  let deptAction = new Department();
  let roleAction = new Role();
  let questions;
  let data;
  let employeeAction = new Employee();
  let departmentList = [];
  const allDept = await deptAction.viewDept();
  for (let i = 0; i < allDept.length; i++) {
    departmentList.push(allDept[i].name);
  }
  let employeeOption = [];
  const employeeArray = await employeeAction.viewEmployeeName();
  for (let i = 0; i < employeeArray.length; i++) {
    employeeOption.push({
      name: employeeArray[i].name,
      value: employeeArray[i].id,
    });
  }
  let roleList = [];
  let roleArray = await roleAction.viewAllRoles();
  for (let i = 0; i < roleArray.length; i++) {
    roleList.push({
      name: roleArray[i].title,
      value: roleArray[i].id,
    });
  }
  switch (response.action) {
    case "View all departments":
      console.log("\nid Department\n-- ---------\n");
      const departments = await deptAction.viewDept();
      for (let i = 0; i < departments.length; i++) {
        console.log(departments[i].id + " " + departments[i].name);
      }
      break;
    case "Add department":
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
    case "Add Employees":
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
userPrompt();
