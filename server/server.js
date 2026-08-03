const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./database/database");
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());


connectDB().then((database) => {

  postsRoute.setDB(database);
  authRoute.setDB(database);

  app.use("/posts", postsRoute);
  app.use("/auth", authRoute);

});


app.get("/", (req, res) => {
  res.send("🚀 Blog API is running!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});