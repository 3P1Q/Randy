// Mongoose profileModel goes here
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const roomSchema = new mongoose.Schema({
    name: String,
    roomid: String,
    users: Array
});

roomSchema.plugin(findOrCreate);

const Room = new mongoose.model("Room", roomSchema);

module.exports = Room;


