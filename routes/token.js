const express = require('express');
const router = express.Router();

const tokens = [
  {
    id: "1",
    tokenId: "T-101",
    name: "yosh",
    phoneNumber: "2345873214",
    status: "closed",
  },
  {
    id: "2",
    tokenId: "T-102",
    name: "hood",
    phoneNumber: "23429487513",
    status: "current",
  }, {
    id: "3",
    tokenId: "T-103",
    name: "one chan",
    phoneNumber: "2938573214",
    status: "waiting",
  },
];

router.get("/getAllTokens", (req, res) => {
    res.send(tokens);
    res.end();
});

module.exports = router;