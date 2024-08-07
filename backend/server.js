/* This code snippet is setting up a basic Node.js server using Express framework. Here's a breakdown
of what each part does: */
const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');

const app = express();
const ActivityRouter=require('./routes/activity.route');
const AuthRouter=require("/.routes/auth.route");
/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 5000;  
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/productivity";
/* Allowing the frontend to access the backend. */
app.use(cors());
    /* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());


/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
app.use("/api",ActivityRouter);

/* `app.use("/api/auth", AuthRouter);` is setting up a route handler for any requests that start with
"/api/auth". It tells the application to use the `AuthRouter` middleware for handling these specific
requests. This means that any requests to routes starting with "/api/auth" will be directed to the
routes defined in the `AuthRouter` module for further processing and handling. */
app.use("/api/auth",AuthRouter);
/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => {
    app.listen(PORT, console.log("Server stated on port 5000"));
  })
  .catch((err) => {
    console.log(err);
  });