db.students.insertMany([
  {
    roll_no: "P001",
    name: "John Doe",
    marks: [85, 90, 78],
    class: "10A",
  },
  {
    roll_no: "P002",
    name: "Jane Smith",
    marks: [88, 92, 95],
    class: "10A",
  },
  {
    roll_no: "P003",
    name: "Alice Johnson",
    marks: [70, 75, 80],
    class: "10B",
  },
  {
    roll_no: "P004",
    name: "Bob Brown",
    marks: [60, 65, 70],
    class: "10B",
  },
  {
    roll_no: "P005",
    name: "Charlie Davis",
    marks: [95, 100, 98],
    class: "10A",
  },
]);

db.students
  .aggregate([
    {
      $project: {
        roll_no: 1,
        name: 1,
        total_marks: { $sum: "$marks" }, // Calculate total marks
      },
    },
    {
      $group: {
        _id: null, // Grouping by null to get a single document
        students: {
          $push: {
            roll_no: "$roll_no",
            name: "$name",
            total_marks: "$total_marks",
          },
        },
      },
    },
    {
      $unwind: "$students", // Unwind to get separate documents for each student
    },
    {
      $replaceRoot: { newRoot: "$students" }, // Replace root to simplify structure
    },
  ])
  .pretty();
