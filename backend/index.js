const mongoose=require("mongoose");
const cors = require("cors");
const express = require("express");
const Order = require("./models/Order");

const app = express();
app.use(cors());  
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/logisticsDB")
    .then(() => console.log("MongoDb connected"))
    .catch((err) =>console.log(err));

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is running..");
});

app.get("/orders",async(req,res) =>{
    try{
        const orders=await Order.find();

        res.json(orders);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.post("/orders",async(req,res) =>{
   console.log("Hit backend");
  try{
    console.log("Incoming:", req.body);

    const{name,pickup,delivery}=req.body;

    if(!name || !pickup || !delivery){
      return res.status(400).json({
        error:"All fields are required"
      });
    }

    const newOrder= new Order({
      name,
      pickup,
      delivery
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

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

app.delete("/orders/:id",async(req,res) =>{
  try{
    const{id}=req.params;

    await Order.findByIdAndDelete(id);

    res.json({
      message:"Order deleted successfully"
    });
  }catch(error){
    res.status(500).json({error:error.message});
  }
});