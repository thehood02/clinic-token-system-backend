require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URI;


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
const PORT = 8080;

app.use(express.json());

const tokenRouter = require("./routes/token");
app.use("/token", tokenRouter);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("henlo");
  res.end();
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
