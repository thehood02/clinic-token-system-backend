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

router.post("/create", tokenGenerator, async (req, res) => {

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

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get("/getCurrent", async (req, res) => {
  try {
    const data = await Model.findOne({"status": "current"});
    // console.log(data);
    if (data == null) {
      res.status(404).json({message: "No token found"});
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post("/next", async (req, res) => {
  // TODO: check if thera are any tokens at all, probably will check it in the condition that there is no current token
  // can I do it like: find the item after an item whose property status is current, then get next item and update that item, then update the very first item whose status is current and make it as complete?
  // other option: update the current as done, find the very first item with waiting status and update that as current

  {
    /* 
     check if there is a current token
     if there is a current token
       update it as complete
       check if there is a next token
         if there is a next token
           make the next token as current
           return the new token
         else if there is no next token
           send message that no tokens left 
     else if there is not a current token
       make the very 1st token as current
       return the token
  */
  }
  try {
    const firstCurrentToken = await Model.findOneAndUpdate(
      { status: "current" },
      { status: "complete" }
    );
    console.log(firstCurrentToken);
    if (firstCurrentToken !== null) {
      const firstWaitingToken = await Model.findOneAndUpdate(
        { status: "waiting" },
        { status: "current" }
      );
      console.log(firstWaitingToken);
      if (firstWaitingToken !== null) {
        res.send(200).json({ message: "Token Updated" });
      } else {
        res.send(200).json({ message: "No Token Left" });
      }
    } else {
      const firstToken = await Model.findOneAndUpdate(
        {},
        { status: "current" }
      );
      console.log(firstToken);
      if (firstToken !== null) {
        res.send(200).json({ message: "Token Updated" });
      } else {
        res.send(200).json({ message: "No Token Left" });
      }
    }

    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
