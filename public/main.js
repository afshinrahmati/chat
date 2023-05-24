const Clientsoket = io();
let username;
let message;
let users = [];
$("#container").css("opacity", "0");

$("#loginBtn").on("click", function (name) {
    event.preventDefault();
    username = $("#username").val();
    Clientsoket.emit("login", { username });
    // set to main 
    Clientsoket.emit('users', { username });
    $("#loginContainer").css("opacity", "0");
    $("#container").css("opacity", "1");
});
function send() {
    event.preventDefault();
    message = $("#mass").val();
    // set username + message in soket server.js with emit set data
    Clientsoket.emit('new_message', { message, username });


    //  html
    $("#chat").append(`
    <li class="me">
    <div class="entete">
        <h3>Time</h3>
        <h2>You</h2>
        <span class="status blue"></span>
    </div>
    <div class="triangle"></div>
    <div class="message">
       ${message}
    </div>
</li>
    `)
}

// get broadcat
Clientsoket.on("broadcast", function (data) {
    const { name, mati } = data;
    $("#chat").append(`
    <li class="you">
    <div class="entete">
        <span class="status green"></span>
        <h2>${name}</h2>
        <h3>time</h3>
    </div>
    <div class="triangle"></div>
        <div class="message">
            ${mati}
        </div>
    </li>
    `
    )

})
Clientsoket.on("users", function (data) {

    let uniqueChars = data.filter((element, index) => {
        return data.indexOf(element) === index;
    });
    console.log(uniqueChars);
    for (let i = 0; i < uniqueChars.length; i++) {
        $("#users").append(`
        <li>
        <img src="./f.jpg" style="width: 58px;height: 50px;" alt="">
        <div>
            <h2>${uniqueChars[i]}</h2>
            <h3>
                <span class="status orange"></span>
                offline
            </h3>
        </div>
    </li>
        `
        )
    }


})

// get from rmin in serverjs

