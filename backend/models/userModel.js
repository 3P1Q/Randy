// Mongoose profileModel goes here
const mongoose = require("mongoose");
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    googleId: String,
    githubId: String,
    profilePic: String,
    rooms: [{roomid: String, name:String, role: String}]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

module.exports = User;


