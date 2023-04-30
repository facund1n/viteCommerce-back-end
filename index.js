require("dotenv").config();

// express:
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Back end index upload");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// mongoose:
const mongoose = require("mongoose");
const URI_DB = process.env.URI_DB;
mongoose
  .connect(URI_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("viteCommerce connexion DB ok"))
  .catch((error) => console.log(error));

// Body Parser:
app.use(express.json());

// cors:
var cors = require("cors");
app.use(cors());
/* let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
}; */

// router:
const productsRoutes = require("./routes/products");
app.use("/", productsRoutes);

const usersRoutes = require("./routes/users");
app.use("/", usersRoutes);
