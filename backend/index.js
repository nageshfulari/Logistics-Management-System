require("dotenv").config();
const mongoose=require("mongoose");
const cors = require("cors");
const express = require("express");
const Order = require("./models/Order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const verifyToken = require("./middleware/verifyToken");

const app = express();
app.use(cors());  
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected"))
    .catch((err) =>console.log(err));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running..");
});

app.get("/orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.post("/orders",verifyToken,async(req,res) =>{
   
  try{
    

    const {
  name,
  pickup,
  delivery,
  priority,
  status,
  estimatedDelivery,
} = req.body;

    if(!name || !pickup || !delivery){
      return res.status(400).json({
        error:"All fields are required"
      });
    }

    const newOrder = new Order({
  name,
  pickup,
  delivery,
  priority,
  status,
  estimatedDelivery,
});

    await newOrder.save();

    res.status(201).json({
      message:"Order created successfully",
      order:newOrder
    });
  }catch(error){
    res.status(500).json({
      error:error.message
    });
  }
});

app.put("/orders/:id", verifyToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // Return updated document
        runValidators: true // Validate schema
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.delete("/orders/:id",verifyToken, async (req, res) => {
  try {

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      message: "Order deleted successfully",
      deletedOrder
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.post("/login", async (req, res) => {
  
  try {
    // Read email and password from frontend
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password is incorrect
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);


// Send success response
res.status(200).json({
  message: "Login Successful",
  token: token,
  user: user.name,
});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

