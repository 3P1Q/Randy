const GitHubStrategy = require( 'passport-github2' ).Strategy;
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const User = require("../../models/userModel");

const router = express.Router();


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/github/randy",
    proxy: true,
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOrCreate({ githubId: profile.id, }, function (err, user,created) {
      
    //   console.log(user);
      if(created===true){
        User.updateOne({ githubId: profile.id, },{
            username: profile.username, 
            profilePic: profile._json.avatar_url,
            name: profile.displayName
          },(err) => {console.log(err)
        });
        user.username = profile.username;
      }
      return done(err, user);
    });
  }
));

router.get("/",
  passport.authenticate('github', { scope: ["user:email"] })
);

router.get("/randy",
  passport.authenticate('github', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    console.log(req.user);
    res.send("Github Authentication Done");
    
    res.redirect(`http://localhost:3000/profile`);
  }
);

module.exports= router;