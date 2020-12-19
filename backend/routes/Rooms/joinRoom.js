const express = require('express');
const User = require('../../models/userModel');
const Room = require('../../models/roomModel');

const router = express.Router();

router.post("/", (req,res)=>{
    const roomid = req.body.roomid;
    const user = req.user._id;

    if(req.user)
    {
        var name="";
        Room.updateOne({roomid: roomid}, {$push: {users : {user: user, role:"member"} } }, (err, _)=>{
            if(err) console.log(err)
        });
        Room.findOne({roomid: roomid},(err, room)=>{
            if(room){
                User.updateOne({_id: req.user._id}, {$push: {rooms :{roomid: roomid, name: room.name, role: "member"} } }, (err, user)=>{
                    if(err) console.log(err);
                })
                res.send({roomid: roomid, name: room.name, role: "member"});
            }
            else{
                res.send();
            }
        })
    }
    else{
        res.send("Not Authenticated");
    }

    
});

module.exports = router;