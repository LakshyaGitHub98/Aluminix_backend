const express = require("express");
const router = express.Router();
const axios = require("axios");
const History = require("../models/History");

// POST /predict
router.post("/", async (req, res) => {
  try {
    let { name, skills } = req.body;

    // ✅ Normalize skills properly
    if (typeof skills === "string") {
      try {
        // Try parsing if it's stringified array
        const parsed = JSON.parse(skills);
        skills = Array.isArray(parsed) ? parsed : [skills];
      } catch {
        // Fallback: split comma string
        skills = skills.split(",").map(s => s.trim());
      }
    }
    // ✅ Convert for ML model (string)
    const skillsText = skills.join(" ");

    // 🔥 Call ML API
    const mlResponse = await axios.post("https://aluminix-ml.onrender.com/predict", {
      skills: skillsText,
    });

    const prediction = mlResponse.data.prediction;

    // ✅ Save in DB
    const history = new History({
      name,
      skills,
      prediction,
    });

    await history.save();

    res.json({
      prediction,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;