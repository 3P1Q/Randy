const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const path = require('path')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

// SETUP CORS
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../client/build")));
}
else{
  app.use(
    cors({
      origin: "http://localhost:3000", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
  );
}

// CORS SETUP ENDS

// SET UP SESSION
app.use(session({
  secret: "Randy, let's recreate the fun of interaction",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// SESSION SETUP COMPLETE

// MONGO SETUP
var MONGODB_URI = "";
if (process.env.NODE_ENV === 'production')
  MONGODB_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.qky0k.mongodb.net/<dbname>?retryWrites=true&w=majority`;
else
  MONGODB_URI = "mongodb://localhost:27017/hacka-demic";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
// MONGO SETUP DONE

const User = require("./models/userModel");
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// ROUTES CONFIG STARTS
const indexRoute = require("./routes/index");
const googleAuth = require("./routes/Auth/googleAuth");
const githubAuth = require("./routes/Auth/githubAuth");
const isLoggedIn = require("./middleware/isLoggedIn");
const createRoom = require('./routes/Rooms/createRoom');
const joinRoom = require('./routes/Rooms/joinRoom');
// ROUTES CONFIG ENDS


// APP CONFIG STARTS
app.use("/api/",indexRoute);
app.use("/api/auth/google",googleAuth);
app.use("/api/auth/github",githubAuth);
app.use("/api/loggedIn",isLoggedIn);
app.use("/api/createroom", createRoom);
app.use("/api/joinroom", joinRoom);
// APP CONFIG ENDS

const server = app.listen(port, function(){
    console.log(`Server started locally at port ${port}`);
});

if(process.env.NODE_ENV === 'production')
{
  app.get("*", (req, res) => { 
    res.sendFile(path.join(__dirname , "../client/build/index.html"));
    });
}


// const http = require("http");
// const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {cors:{origin:'*'}});

const users = {};

var activeUsers = [];

io.on('connection', socket => {
    const username = socket.handshake.query.username;
    console.log(username);
    socket.join(username)
    console.log("Connected to socket");
    if (!users[username]) {
        users[username] = username;
    }
    socket.emit("yourID", username);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[username];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signal, callFrom: data.callFrom});
    })

    socket.on("connectNow", async (data) => {
      activeUsers.push({user: data.callFrom, signal:data.signal});
      
      if(activeUsers.length>1)
      {
        for(let user of activeUsers)
        {
          if(user.user !== data.callFrom){
            await io.to(user.user).emit('hey', {signal: data.signal, callFrom:data.callFrom});
            // await io.to(data.callFrom).emit('callAccepted', user.signal);
            activeUsers = activeUsers.filter((us) => (us.user!==user.user && us.user!==data.callFrom));
          }
        }
      }
      console.log(activeUsers);
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
});