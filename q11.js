// use mydatabase;  // Replace with the name of your database

function saveItem(item_id, quantity, price, brand) {
  db.Item.updateOne(
    { item_id: item_id }, // Query to find the document by item_id
    {
      $set: {
        item_id: item_id,
        quantity: quantity,
        price: price,
        brand: brand,
      },
    },
    { upsert: true } // Upsert option to insert if not exists, update if exists
  );
}

// Example usage:
saveItem("item123", 50, 29.99, "BrandA");
saveItem("item124", 30, 19.99, "BrandB");

function getAllItems() {
  return db.Item.find().pretty();
}

// Example usage:
getAllItems();

function getItemById(item_id) {
  return db.Item.findOne({ item_id: item_id });
}

// Example usage:
getItemById("item123");

function updateItem(item_id, newQuantity, newPrice, newBrand) {
  db.Item.updateOne(
    { item_id: item_id },
    {
      $set: {
        quantity: newQuantity,
        price: newPrice,
        brand: newBrand,
      },
    }
  );
}

// Example usage:
updateItem("item123", 75, 34.99, "BrandA");

function deleteItem(item_id) {
  db.Item.deleteOne({ item_id: item_id });
}

// Example usage:
deleteItem("item123");

// 1. Save or upsert an item
saveItem("item123", 50, 29.99, "BrandA");

// 2. Read all items
getAllItems();

// 3. Read a specific item
getItemById("item123");

// 4. Update an item
updateItem("item123", 75, 34.99, "BrandA");

// 5. Delete an item
deleteItem("item123");
