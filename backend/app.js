const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// MONGO SETUP
var MONGODB_URI = "";
if (process.env.NODE_ENV === 'production')
  MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qvaqf.mongodb.net/Hackanect?retryWrites=true&w=majority`;
else
  MONGODB_URI = "mongodb://localhost:27017/hacka-demic";

  mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
// MONGO SETUP DONE


// ROUTES CONFIG STARTS
const indexRoute = require("./routes/index");
// ROUTES CONFIG ENDS


// APP CONFIG STARTS
app.use("/api/",indexRoute);
// APP CONFIG ENDS

const server = app.listen(port, function(){
    console.log(`Server started locally at port ${port}`);
});