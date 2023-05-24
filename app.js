const express = require('express');

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("henlo");
    res.end();
})

app.listen(3000, () => {
    console.log(`server started at http://localhost:${PORT}`);
})