const express = require("express");
const app = express();
const PORT = 8080;

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
