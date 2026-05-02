const express = require("express");
const History = require("../models/History");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const data = await History.find({ userId: req.params.userId });
  res.json(data);
});

module.exports = router;