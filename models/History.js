const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  userId: String,
  branch: String,
  skills: String,
  career: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", HistorySchema);