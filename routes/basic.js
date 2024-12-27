const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


var employees = [
    { "id": 1, "name": "john", "designation": "senior manager", "location": "Los angeles", "salary": 160000 },
    {  "id": 2, "name": "Smith",  "designation": "Manager", "location": "Las vegas","salary": 115000 },
    {  "id": 3, "name" :"Fred",  "designation": "software engineer", "location": "hawaii", "salary": 100000 }
];


function employeeRoutes(nav) {
    
    router.get('/', (req, res) => {
        res.render("home", {
            title: 'Employee Management',
            data: employees,
            nav
        });
    });

    
    router.get('/form', (req, res) => {
        res.render("form", {
            title: 'Add Employee',
            nav
        });
    });

    
    router.post('/add', (req, res) => {
        const { name, designation, location, salary } = req.body;
        const newEmployee = { 
            id: employees.length + 1, 
            name, 
            designation, 
            location, 
            salary 
        };
        employees.push(newEmployee);
        res.redirect('/basic'); 
    });

    
    router.get('/edit/:id', (req, res) => {
        const { id } = req.params;
        const employee = employees.find(emp => emp.id == id);
        if (employee) {
            res.render("edit", {
                title: 'Edit Employee',
                employee,
                nav
            });
        } else {
            res.status(404).send("Employee not found");
        }
    });

   
router.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, designation, location, salary } = req.body;

    let employee = employees.find(emp => emp.id == id);
    if (employee) {
        employee.name = name;
        employee.designation = designation;
        employee.location = location;
        employee.salary = salary;
        res.redirect('/basic');  
    } else {
        res.status(404).send("Employee not found");
    }
});

    
    router.delete('/delete/:id', (req, res) => {
        const { id } = req.params;
        employees = employees.filter(emp => emp.id != id);
        res.redirect('/basic'); 
    });

    return router;
}

module.exports = employeeRoutes;
