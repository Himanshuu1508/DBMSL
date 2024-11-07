db.person.insertMany([
  {
    person_id: "P001",
    name: "Alice Smith",
    addr: "123 Maple St",
    profession: "Engineer",
  },
  {
    person_id: "P002",
    name: "Bob Johnson",
    addr: "456 Oak St",
    profession: "Doctor",
  },
  {
    person_id: "P003",
    name: "Charlie Brown",
    addr: "789 Pine St",
    profession: "Engineer",
  },
  {
    person_id: "P004",
    name: "David Wilson",
    addr: "321 Birch St",
    profession: "Doctor",
  },
  {
    person_id: "P005",
    name: "Eve Davis",
    addr: "654 Cedar St",
    profession: "Teacher",
  },
]);

db.person
  .aggregate([
    {
      $group: {
        _id: "$profession", // Group by profession
        people: { $push: { name: "$name", person_id: "$person_id" } }, // Collect names and IDs of persons in an array
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from output
        profession: "$_id", // Include profession in output
        people: 1, // Include collected people array
      },
    },
  ])
  .pretty();
