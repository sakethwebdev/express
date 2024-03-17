
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./Employee");
const Order = require("./Order");


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          alert("plesae check the details")
          res.json("the password is incorrect");
        }
      } else {
        res.json("No record existed");
      }
      
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.get("/register", (req, res) => {
  EmployeeModel.find().then((employees) => res.json(employees));
});

app.post("/placeOrder", async (req, res) => {
  try {
    const { email, address, paymentMethod, items } = req.body;

    const order = new Order({
      email,
      address,
      paymentMethod,
      items,
    });

    await order.save();

    res.json({ message: "Order has placed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
