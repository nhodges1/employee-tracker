const connection = require("./connection");

class DB {
    // reference to the connection on the class
    constructor(connection) {
        this.connection = connection;
    }

    // find all employees, join with roles and departments tables to display all metrics
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // find all employees except the given employee id
    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    // create new employee
    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    // remove employee with given id
    removeEmployee(employeeId) {
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }

    // update the given employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    // update given employee manager
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }

    // find all roles, join with department to display department name
    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    // create new role
    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET?", role);
    }

    // remove role from db
    removeRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }

    // find all departments
    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    // find all departemnts, join with employees and roles and sum up department budget
    viewDepartmentBudgets() {
        return this.connection.promise().query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }

    // create new department
    createDepartment(departemnt) {
        return this.connection.promise().query("INSERT INTO department SET ?", departemnt);
    }

    // remove department
    removeDepartment(departmentId) {
        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?",
            departmentId
        );
    }

    // find all employees in a given department, join with role to display role titles
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }

    // find all employees by manager, join with departments and roles to display titles and department names
    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }
}

module.exports = new DB(connection);