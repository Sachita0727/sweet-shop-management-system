const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Sweet = require("./models/Sweet"); // ✅ MODEL

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MONGODB CONNECT
mongoose.connect(
  "mongodb+srv://isachitaseth07_db_user:BOWHGsa0a6TznC38@sweet-shop.fclids9.mongodb.net/sweetshop?appName=Sweet-shop"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ROOT
app.get("/", (req, res) => {
  res.send("Sweet Shop Backend Running Successfully");
});

// ✅ ADD SWEET (DB)
app.post("/sweets", async (req, res) => {
  const sweet = new Sweet(req.body);
  await sweet.save();
  res.status(201).json(sweet);
});

// ✅ GET ALL SWEETS (DB)
app.get("/sweets", async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
});

// ✅ DELETE SWEET (DB)
app.delete("/sweets/:id", async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted successfully" });
});

// ✅ PURCHASE SWEET (DB)
app.post("/sweets/:id/purchase", async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet || sweet.quantity === 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();
  res.json(sweet);
});

// SERVER
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
