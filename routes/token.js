const express = require('express');
const router = express.Router();

const Model = require("../model/model");

const tokenGenerator = (req, res, next) => {
  res.locals.newToken = "T-101";

  Model.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((item) => {
      console.log(item);
      if (item[0]?.tokenId) {
        console.log("hi");
        const prevToken = parseInt(item[0].tokenId.match(/\d+/)[0]);
        const tokenNumber = prevToken + 1;
        res.locals.newToken = "T-" + tokenNumber;
        console.log("tochan", res.locals.newToken);
      }
      next();
    });
};

router.get("/getAllTokens", (req, res) => {
    res.send("get all api");
    res.end();
});

router.get("/getCurrentToken", (req, res) => {
  res.send("get api");
  res.end();
})

router.post("/createToken", tokenGenerator, async (req, res) => {

  // let newToken = "T-101";

  // Model.find({})
  //   .sort({ _id: -1 })
  //   .limit(1)
  //   .then((item) => {
  //     console.log(item);
  //     if (item[0]?.tokenId) {
  //       console.log("hi")
  //       const prevToken = parseInt(item[0].tokenId.match(/\d+/)[0]);
  //       const tokenNumber = prevToken + 1;
  //       newToken = "T-" + tokenNumber
  //       console.log("tochan",newToken);
  //     }
  //   });


  const data = new Model({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    status: 'waiting',
    tokenId: res.locals.newToken
  })

  console.log("data", data)

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

router.get("/getNextToken", (req, res) => {
  res.send("update api");
  res.end();
})


module.exports = router;
