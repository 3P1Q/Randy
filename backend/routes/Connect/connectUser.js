const express = require('express');
const Room = require('../../models/roomModel');
const User = require('../../models/userModel');

const router = express.Router();

router.post("/", (req,res)=>{
    const roomid = req.body.roomid;
    const currUser = req.user.username;
    Room.updateOne({roomid: roomid, 'users.user':currUser}, {'users.$.active' : true}, (err,_)=>{
        if(err) console.log(err);
    });

    const timeout = new Promise((resolve, reject) =>
        setTimeout(
            () => {
                Room.updateOne({roomid: roomid, 'users.user':currUser}, {'users.$.active' : false}, (err,_)=>{
                    if(err) console.log(err);
                });
                return reject(`Timed out after 10 s.`)
            }, 10000)
    );

    const find = new Promise((resolve, reject)=>{
        const userTo = null;
        // while(userTo === null)
        // {   
            
            // userTo = activeUsers[0];
            // console.log(activeUsers);
        // }
    })
    var activeUsers = [];
    Room.findOne({roomid: roomid}, (err, room)=>{
        activeUsers = room.users.filter((user) => (user.active === true && user.user!==currUser));
        if(activeUsers)
            res.send(activeUsers[0]);
        // console.log(activeUsers);
    })
            
    
    // res.send(Promise.race([
    //     find,
    //     timeout
    // ]));
});

module.exports = router;