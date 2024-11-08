// Connect to the database
use company;

// Creating the `employees` collection
db.employees.insertMany([
    { emp_id: 1, name: "Amit Kumar", department: "Sales", salary: 50000, joining_date: ISODate("2019-06-15") },
    { emp_id: 2, name: "Neha Verma", department: "HR", salary: 45000, joining_date: ISODate("2020-07-10") },
    { emp_id: 3, name: "Rajesh Kumar", department: "Engineering", salary: 60000, joining_date: ISODate("2018-03-01") },
    { emp_id: 4, name: "Priya Singh", department: "Sales", salary: 55000, joining_date: ISODate("2021-01-01") },
    { emp_id: 5, name: "Arjun Gupta", department: "Sales", salary: 52000, joining_date: ISODate("2020-05-10") }
]);

// Creating the `sales` collection
db.sales.insertMany([
    { sale_id: 1, emp_id: 1, product: "Laptop", amount: 1200, sale_date: ISODate("2023-08-10") },
    { sale_id: 2, emp_id: 1, product: "Mobile", amount: 800, sale_date: ISODate("2023-08-12") },
    { sale_id: 3, emp_id: 2, product: "Tablet", amount: 400, sale_date: ISODate("2023-08-14") },
    { sale_id: 4, emp_id: 3, product: "Monitor", amount: 300, sale_date: ISODate("2023-08-18") },
    { sale_id: 5, emp_id: 4, product: "Headphones", amount: 150, sale_date: ISODate("2023-08-20") }
]);

db.sales.aggregate([
    {
        $group: {
            _id: "$emp_id", // Group by employee ID
            total_sales: { $sum: "$amount" } // Calculate the total sales amount for each employee
        }
    },
    {
        $lookup: {
            from: "employees", // Join with the `employees` collection
            localField: "_id",  // Match on employee ID
            foreignField: "emp_id",
            as: "employee_details"
        }
    },
    {
        $unwind: "$employee_details" // Flatten the employee details array
    },
    {
        $project: {
            _id: 0,
            emp_id: "$_id",
            name: "$employee_details.name",
            total_sales: 1
        }
    }
]);

db.employees.aggregate([
    {
        $group: {
            _id: "$department", // Group by department
            average_salary: { $avg: "$salary" } // Calculate the average salary for each department
        }
    }
]);

db.sales.createIndex({ emp_id: 1 });
db.employees.createIndex({ salary: 1 });

db.employees.find({ salary: { $gt: 50000 } });  // This will use the index on `salary`
db.employees.find({ salary: { $gt: 50000 } });  // This will use the index on `salary`
