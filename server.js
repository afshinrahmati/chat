const { log } = require('console');
const express = require('express');
const app = express()
const Server = require('http').createServer(app)
const path = require('path');
const PORT = 4200;
const soketio = require('socket.io');
const io = soketio(Server);


app.use(express.static(path.join(__dirname, 'public')))

var clients = [];
//io events
//emit===>harf*on==>daryaft
io.on("connection", (soketio) => {

    // data ro user migirim
    soketio.on('users', (data) => {
        // to server store and agin send to client
        io.emit('users', clients)
    }
    );

    soketio.on("login", function (data) {
        clients.push(data.username)
        io.emit("user", { username: data.username });
    })

    soketio.on("new_message", function (data) {
        soketio.broadcast.emit('broadcast', { mati: data.message, name: data.username });
    })

    // get data form main.js
    //kharj shodan fard
    soketio.on("disconnect", (data) => {
        console.log("______LEFT__________>" + soketio.id);
    })

})







Server.listen(PORT, () => {
    console.log(PORT + " " + 'Running');
})