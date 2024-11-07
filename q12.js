// use mydatabase

// Insert multiple items at once
db.Item.insertMany([
  {
    item_id: "item001",
    quantity: 100,
    price: 29.99,
    brand: "BrandA",
    discount: 5,
  },
  {
    item_id: "item002",
    quantity: 200,
    price: 49.99,
    brand: "BrandB",
    discount: 10,
  },
  {
    item_id: "item003",
    quantity: 150,
    price: 19.99,
    brand: "BrandA",
    discount: 8,
  },
  {
    item_id: "item004",
    quantity: 300,
    price: 39.99,
    brand: "BrandC",
    discount: 15,
  },
  {
    item_id: "item005",
    quantity: 50,
    price: 25.99,
    brand: "BrandB",
    discount: 12,
  },
  {
    item_id: "item006",
    quantity: 75,
    price: 45.99,
    brand: "BrandD",
    discount: 20,
  },
  {
    item_id: "item007",
    quantity: 120,
    price: 22.99,
    brand: "BrandA",
    discount: 5,
  },
  {
    item_id: "item008",
    quantity: 180,
    price: 18.99,
    brand: "BrandC",
    discount: 7,
  },
  {
    item_id: "item009",
    quantity: 90,
    price: 32.99,
    brand: "BrandB",
    discount: 3,
  },
  {
    item_id: "item010",
    quantity: 60,
    price: 55.99,
    brand: "BrandD",
    discount: 18,
  },
]);

function saveItem(item_id, quantity, price, brand, discount) {
  db.Item.update(
    { item_id: item_id }, // Query to find the document by item_id
    {
      $set: {
        item_id: item_id,
        quantity: quantity,
        price: price,
        brand: brand,
        discount: discount,
      },
    },
    { upsert: true } // Upsert option to insert if not exists, update if exists
  );
}

// Example usage:
saveItem("item123", 50, 29.99, "BrandA", 5);
saveItem("item124", 30, 19.99, "BrandB", 10);

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

function updateItem(item_id, newQuantity, newPrice, newBrand, newDiscount) {
  db.Item.updateOne(
    { item_id: item_id },
    {
      $set: {
        quantity: newQuantity,
        price: newPrice,
        brand: newBrand,
        discount: newDiscount,
      },
    }
  );
}

// Example usage:
updateItem("item123", 75, 34.99, "BrandA", 15);

function deleteItem(item_id) {
  db.Item.deleteOne({ item_id: item_id });
}

// Example usage:
deleteItem("item123");

function countItemsByBrand() {
  return db.Item.aggregate([{ $group: { _id: "$brand", count: { $sum: 1 } } }]);
}

// Example usage:
countItemsByBrand();

function getItemWithMinPrice() {
  return db.Item.find().sort({ price: 1 }).limit(1);
}

// Example usage:
getItemWithMinPrice();

function getMaxDiscount() {
  return db.Item.aggregate([
    { $group: { _id: null, maxDiscount: { $max: "$discount" } } },
  ]);
}

// Example usage:
getMaxDiscount();
