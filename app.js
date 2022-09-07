const express = require("express");
const app = express();
const helmet = require("helmet");
app.use(helmet());

require("dotenv").config();

const corsMiddleware = require("./utils/cors");
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
//Cors
app.use(corsMiddleware);
app.options("*", corsMiddleware);

app.use(helmet());

app.use(express.static("views"));
app.use("/booking", booking);

app.use((req, res) => {
  res.end("Cafe One");
});

module.exports = app;
