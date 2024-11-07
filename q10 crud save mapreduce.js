// use mydatabase;

// Define the saveItem function
function saveItem(item_id, quantity, price, brand) {
  db.Item.updateOne(
    { item_id: item_id },
    {
      $set: {
        item_id: item_id,
        quantity: quantity,
        price: price,
        brand: brand,
      },
    },
    { upsert: true }
  );
}

// Insert or update items
saveItem("item123", 50, 29.99, "BrandA");
saveItem("item124", 30, 19.99, "BrandB");
saveItem("item123", 20, 29.99, "BrandA"); // Update item123

// Define the MapReduce functions
var mapFunction = function () {
  emit(this.item_id, this.quantity);
};

var reduceFunction = function (key, values) {
  return Array.sum(values);
};

// Perform MapReduce to count item quantities
db.Item.mapReduce(mapFunction, reduceFunction, {
  out: "item_quantity_totals", // Output collection
});

// Show the MapReduce results
db.item_quantity_totals.find().pretty();
