const express = require("express");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");
const helmet = require("helmet");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const DB = require("./config/DBConfig");
// const { requestLimiter } = require("./middlewares/requestLimiter");

// Swagger Documentation
// const swaggerDocs = require("./DOCS/Swagger");

const app = express();

// DB Connection
// mongoose
//   .connect(MONGO_URI)
//   .then(connect => console.log(`Connected to DB ${connect.connection.hostname}`))
//   .catch((err) => {
//     console.log("DB connection failed : ", err);
//   });
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Prevent Http param pollution
app.use(hpp());

// Prevent XSS attacks
app.use(xss());

// Initialize Swagger
// Define your basic auth options
const authOptions = {
  users: {
    admin: "admin@357",
    flutter_dev: "dev@gmind357"
  },
  challenge: true,
  realm: "Shiftlyzer",
};
// app.use(
//   "/api-docs",
//   basicAuth(authOptions),
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocs)
// );

// Images
app.use(express.static(__dirname + "/public"));

//Routes
// app.use("/api", requestLimiter, require("./routes"));
app.use('/api', require('./routes'))

//Listening
DB().then((connect) => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} and db ${connect.connection.host}`);
  })
})

