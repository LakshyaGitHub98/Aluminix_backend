const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/predict", require("./routes/predict"));
app.use("/api/history", require("./routes/history"));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});