const express = require('express');
const Room = require('../../models/roomModel');
const User = require('../../models/userModel');

const router = express.Router();

router.post("/", (req,res)=>{
    const roomid = req.body.roomid;
    const name = req.body.name;
    console.log(req.user._id);
    if(req.user){
        const newRoom = new Room({
            roomid: roomid,
            name: name,
            users: [{user: req.user._id, role:"admin"}]
        });
        newRoom.save();
         User.updateOne({_id: req.user.id} , {$push:{rooms: {roomid:req.body.roomid, name: req.body.name, role: "admin"}}}, (err, user)=>{
            if(err) console.log(err);
        })
        res.send({roomid:req.body.roomid, name: req.body.name, role: "admin"});
    }
    else
    {
        res.send("Not Authenticated");
    }
});

module.exports = router;