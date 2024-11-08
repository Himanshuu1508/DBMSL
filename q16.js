// Switch to your desired database (create it if it doesn't exist)
use companyDB;

// Create the 'employee' collection (optional, as it will be created automatically on first insert)
db.createCollection("employee");

// Insert multiple documents
db.employee.insertMany([
  {
      emp_id: "E001",
      e_name: "Alice Smith",
      salary: 60000,
      Date_of_Joining: new Date("2016-06-15"),
      Dept_no: "D01",
      Designation: "Engineer"
  },
  {
      emp_id: "E002",
      e_name: "Bob Johnson",
      salary: 75000,
      Date_of_Joining: new Date("2016-07-20"),
      Dept_no: "D02",
      Designation: "Manager"
  },
  {
      emp_id: "E003",
      e_name: "Charlie Brown",
      salary: 50000,
      Date_of_Joining: new Date("2016-06-10"),
      Dept_no: "D01",
      Designation: "Engineer"
  },
  {
      emp_id: "E004",
      e_name: "David Wilson",
      salary: 80000,
      Date_of_Joining: new Date("2016-06-25"),
      Dept_no: "D03",
      Designation: "Analyst"
  },
  {
      emp_id: "E005",
      e_name: "Eve Davis",
      salary: 90000,
      Date_of_Joining: new Date("2016-05-30"),
      Dept_no: "D02",
      Designation: "Senior Manager"
  }
]);

// Verify that the data has been inserted
db.employee.find().pretty();

// Retrieve a specific document by emp_id
db.employee.findOne({ emp_id: "E001" });

// Update a single document (e.g., change the salary of Alice Smith)
db.employee.updateOne(
    { emp_id: "E001" }, // Filter criteria
    { $set: { salary: 65000 } } // Update operation
);

// Update multiple documents (e.g., change designation for all Engineers)
db.employee.updateMany(
    { Designation: "Engineer" }, // Filter criteria
    { $set: { Designation: "Senior Engineer" } } // Update operation
);

// Delete a single document by emp_id
db.employee.deleteOne({ emp_id: "E005" });

// Delete multiple documents (e.g., delete all employees in department D02)
db.employee.deleteMany({ Dept_no: "D02" });

db.employee.aggregate([
    {
        $match: { Dept_no: "D02" } // Assuming D02 is Sales department
    },
    {
        $group: {
            _id: null,
            averageSalary: { $avg: "$salary" } // Calculate average salary
        }
    }
]).pretty();

db.employee.aggregate([
    {
        $match: {
            Date_of_Joining: {
                $gte: new Date("2016-06-01"),
                $lt: new Date("2016-07-01")
            }
        }
    },
    {
        $group: {
            _id: null,
            minSalary: { $min: "$salary" } // Calculate minimum salary
        }
    }
]).pretty();

db.employee.aggregate([
    {
        $match: { Dept_no: "D03" } // Assuming D03 is Production department
    },
    {
        $group: {
            _id: null,
            maxSalary: { $max: "$salary" } // Calculate maximum salary
        }
    }
]).pretty();

db.employee.aggregate([
    {
        $sort: { Date_of_Joining: 1 } // Sort by date of joining (ascending)
    },
    {
        $group:
        {
            _id : "$Dept_no", // Group by department number
            firstEmployee : { $first : "$$ROOT" }, // Get first employee record
            lastEmployee : { $last : "$$ROOT" } // Get last employee record
        }
    }
]).pretty();