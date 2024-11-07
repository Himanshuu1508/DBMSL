db.createCollection("person");

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

// Retrieve all documents
db.person.find().pretty();

// Retrieve a specific document by person_id
db.person.findOne({ person_id: "P001" });

// Update a single document (e.g., change the address of Alice Smith)
db.person.updateOne(
  { person_id: "P001" }, // Filter criteria
  { $set: { addr: "124 Maple St" } } // Update operation
);

// Update multiple documents (e.g., change profession for all Engineers)
db.person.updateMany(
  { profession: "Engineer" }, // Filter criteria
  { $set: { profession: "Senior Engineer" } } // Update operation
);

// Delete a single document by person_id
db.person.deleteOne({ person_id: "P005" });

// Delete multiple documents (e.g., delete all Doctors)
db.person.deleteMany({ profession: "Doctor" });

// Optionally, drop the entire collection if needed
db.person.drop();
