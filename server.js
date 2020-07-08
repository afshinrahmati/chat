const express = require('express');
const app = express()
const Server = require('http').createServer(app)
const path = require('path');
const PORT = 4200;
const soketio = require('socket.io');
const io = soketio(Server);


app.use(express.static(path.join(__dirname, 'public')))


//io events
//emit===>harf*on==>daryaft
io.on("connection", (soketio) => {


    //emit ha for frstadn data
    soketio.emit("test", { message: "hello" });
    //on grftan atalt az data
    soketio.on('testmani', function(data) {
        // console.log(data);
    });

    soketio.on("login", function(data) {
        console.log(data.username + " " + 'is login with id ' + " " + soketio.id);
        //io is all
        io.emit("newuser", { namenew: data.username });
        soketio.emit("himself", { message: `Hello ${data.username}` })

    })

    soketio.on("newmassage", function(data) {

        soketio.broadcast.emit('broadcast', { mati: data.message, name: data.username });

    })

    //kharj shodan fard
    soketio.on("disconnect", (data) => {
        console.log("______LEFT__________>" + soketio.id);
    })

})







Server.listen(PORT, () => {
    console.log(PORT + " " + 'Running');
})