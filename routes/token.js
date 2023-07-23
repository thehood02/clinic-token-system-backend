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

router.get("/getCurrentToken", async (req, res) => {
  try {
    const data = await Model.findOne({"status": "current"});
    // console.log(data);
    if (data == null) {
      res.status(404).json({message: "No current token found"});
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get("/getNextToken", (req, res) => {
  // check if there is a current token
    // if there is a current token
      // update it as complete
      // check if there is a next token
        // if there is a next token
          // make the next token as current
          // return the new token
        // else if there is no next token
          // send message that no tokens left 
    // else if there is not a current token
      // make the very 1st token as current
      // return the token
  res.send("update api");
  res.end();
})


module.exports = router;
