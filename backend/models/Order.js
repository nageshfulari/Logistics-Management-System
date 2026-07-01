const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pickup: {
    type: String,
    required: true
  },
  delivery: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;