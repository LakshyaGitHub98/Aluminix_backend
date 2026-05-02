const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  skills: {
    type: [String], // ✅ FIX: array of strings
    required: true,
  },

  prediction: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);