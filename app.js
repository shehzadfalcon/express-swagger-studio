var createError = require("http-errors");
var express = require("express");
var dotenv = require("dotenv");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
dotenv.config()
var app = express();
const PORT = process.env.PORT || 4000;
console.log(process.env.PORT)
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "MemoryLane API",
    version: "0.0.0",
    contact: {
      name: "Hosted on Firebase",
    },
    description: "Documentation",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
    {
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/users.js"],
};

const swaggerSpec = swaggerJSDoc(options);

if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.listen(PORT);
} else {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.listen(PORT, () => console.log(`Server started @ Port ${PORT}`));
}

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
