const cors = require("cors");
const whitelist = [
  "http://localhost:1234",
  "http://localhost:3000",
  "https://cafeone1.netlify.app",
];

const corsOptions = {
  optionsSuccessStatus: 200,
  origin: whitelist,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
module.exports = cors(corsOptions);
