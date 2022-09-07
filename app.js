const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const booking = require("./routes/booking");

// //Sets our app to use the handlebars engine
// app.set("view engine", "handlebars");
// //Sets handlebars configurations (we will go through them later on)
// const handlebarOptions = app.engine(
//   "handlebars",
//   hbs({
//     layoutsDir: __dirname + "/views/",
//   })
// );

// transporter.use("compile", hbs(handlebarOptions));

app.use(express.json());
app.use(cors());

app.use(express.static("views"));
app.use("/booking", booking);

app.use((req, res) => {
  res.end("Cafe One");
});

module.exports = app;
