const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const authRoutes = require("./src/routes/authRoutes");
const path = require("path");

const app = express();
const cors = require("cors");
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/auth", authRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
