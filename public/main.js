const Clientsoket = io();
//agh in var emit kardim bayd on var on konim agh onvar on kardim bayd inja emit konim
//1 test ro bgir k on var to server emit cardim(   soketio.emit("test", { message: "hello" });)
Clientsoket.on("test", function(data) {
    // console.log(data);
});
//2 emit bad dar server on
Clientsoket.emit("testmani", { number: 20 })
    //

$("#loginBtn").on("click", function(name) {
    event.preventDefault();
    username = $("#username").val();
    Clientsoket.emit("login", { username });
    Clientsoket.on("himself", function(data) {
        console.log(data.message);
    });
    $("#loginContainer").css("opacity", "0");
    $("#chatForm").css("opacity", "1");
    $("#chatHistory").css("opacity", "1");
});
$("#messagenpm").on("click", function(name) {
    event.preventDefault();
    let message = $("#mass").val();
    console.log(message);
    Clientsoket.emit('newmassage', { message, username });

    $("#chatHistory").append(`<div> 
    <div class="you">YOU</div>
    <div>${message}</div>
    </div>`)
});

Clientsoket.on("broadcast", function(data) {
    console.log(data);
    $("#chatHistory").append(`<div> 
    <div class="other">${data.name}</div>
    <div>${data.mati}</div>
    </div>`)

})


Clientsoket.on("newuser", function(data) {
    console.log(data.namenew);

})