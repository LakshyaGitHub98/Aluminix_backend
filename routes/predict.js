const express = require("express");
const axios = require("axios");
const History = require("../models/History");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { branch, skills, userId } = req.body;

    // Call Flask API
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      branch,
      skills
    });

    const career = response.data.career;

    // Save history
    const history = new History({
      userId,
      branch,
      skills,
      career
    });

    await history.save();

    res.json({
      career
    });

  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;