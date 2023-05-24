const Clientsoket = io();
//agh in var emit kardim bayd on var on konim agh onvar on kardim bayd inja emit konim
//1 test ro bgir k on var to server emit cardim(   soketio.emit("test", { message: "hello" });)


$("#loginBtn").on("click", function (name) {
    event.preventDefault();
    username = $("#username").val();
    Clientsoket.emit("login", { username });
    Clientsoket.on("himself", function (data) {
        console.log(data.message);
    });
    $("#loginContainer").css("opacity", "0");
    $("#chatForm").css("opacity", "1");
    $("#chatHistory").css("opacity", "1");
});
$("#messagenpm").on("click", function (name) {
    event.preventDefault();
    let message = $("#mass").val();
    Clientsoket.emit('newmassage', { message, username });

    $("#chatHistory").append(`<div style=margin-left:auto> 
    <div class="you">YOU</div>
    <img src="./icon.png" alt="Avatar" style="width:50px">
    <div>${message}</div>
    </div>`)
});

Clientsoket.on("broadcast", function (data) {
    console.log("5555555");
    console.log(data.name);
    $("#chatHistory").append(`<div> 
    <div class="other">${data.name}</div>
    <img src="/w3images/bandmember.jpg" alt="Avatar" style="width:100%;">
    <div>${data.mati}</div>
    </div>`)

})


Clientsoket.on("newuser", function (data) {
    console.log(data.namenew);

})