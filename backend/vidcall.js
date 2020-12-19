// const express = require("express");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// const socket = require("socket.io");
// const io = socket(server);

// const users = {};

// io.on('connection', socket => {
//     const username = socket.handshake.query._id
//     socket.join(username)
//     console.log("connect ho rha hai kya?")
//     if (!users[username]) {
//         users[username] = username;
//     }
//     socket.emit("yourID", username);
//     io.sockets.emit("allUsers", users);
//     socket.on('disconnect', () => {
//         delete users[username];
//     })

//     socket.on("callUser", (data) => {
//         io.to(data.userToCall).emit('hey', {signal: data.signalData, callFrom: data.from});
//     })

//     socket.on("acceptCall", (data) => {
//         io.to(data.to).emit('callAccepted', data.signal);
//     })
// });

server.listen(8000, () => console.log('server is running on port 8000'));


