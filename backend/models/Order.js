const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    pickup: {
      type: String,
      required: true,
    },

    delivery: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Normal", "High", "Urgent"],
      default: "Normal",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Transit",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    estimatedDelivery: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;