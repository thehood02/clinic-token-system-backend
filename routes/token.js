const express = require('express');
const router = express.Router();

const Model = require("../model/model");

const tokenGenerator = (req, res, next) => {
  res.locals.newToken = "T-101";

  Model.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((item) => {
      if (item[0]?.tokenId) {
        const previousTokenNumber = parseInt(item[0].tokenId.match(/\d+/)[0]);
        const newTokenNumber = previousTokenNumber + 1;
        res.locals.newToken = "T-" + newTokenNumber;
      }
      next();
    });
};

router.post("/createToken", tokenGenerator, async (req, res) => {

  const data = new Model({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    status: 'waiting',
    tokenId: res.locals.newToken
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

router.get("/getAllTokens", async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get("/getCurrentToken", (req, res) => {
  res.send("get api");
  res.end();
});

router.get("/getNextToken", (req, res) => {
  res.send("update api");
  res.end();
})


module.exports = router;
