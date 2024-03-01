
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: String,
  address: String,
  paymentMethod: String,
  book: [
    {
      id: Number,
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);


module.exports = Order;
