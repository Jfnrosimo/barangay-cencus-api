require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const port = 8000;

//Server setup
const server = express();

// //Middlewares
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(helmet());

//Routes
const OccupantRouter = require("./routes/occupants");
const AuthenticationRouter = require("./routes/users");

//let server use routes
server.use("/api/v1/occupants", OccupantRouter);
server.use("/user", AuthenticationRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`This server is connected to db and running at port`, port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Deployment setup
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  server.get("/", (request, response) => {
    server.use(express.static(path.resolve(__dirname, "client", "build")));
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.get("/", (request, response) => {
  response.send("Welcome to Web based barangay census server");
});
