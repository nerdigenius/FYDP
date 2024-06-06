const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const authRoutes = require("./src/routes/authRoutes");
const path = require("path");
const contractRoutes = require('./src/routes/contractRoutes')

const app = express();
const cors = require("cors");
const db='devote'

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(config.MONGODB_URI+db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/auth", authRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

app.use('/contract',contractRoutes)
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
