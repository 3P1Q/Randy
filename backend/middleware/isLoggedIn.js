const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.get("/", (req, res) => {
    res.send("Welcome to isLoggedIn");
});

router.post("/", (req,res) => {
   if(req.user)
   {
       res.send(req.user);
   }
   else
   {
       res.send({loggedin: false});
   }
});

module.exports = router;
