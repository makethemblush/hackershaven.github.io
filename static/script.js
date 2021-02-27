function get_form_data() {
    // vars
    var TIME = time_now();
    var NAME = document.getElementById("nick").value;
    var INSTA_ID = document.getElementById("IGID").value;
    var IP_ADDR = document.getElementById("addr").innerHTML;
    var WANNA_LEARN = document.getElementById("learn").value;
    var REFERRED_BY = document.getElementById("referral").value;
    var MESSAGE = document.getElementById("goals").value;
    var EDU = document.getElementById("edu_accept");
    var PRIV = document.getElementById("priv_accept");

    // pack and send to registrants log
    // format: [TIME, NAME, INSTA_ID, IP_ADDR, WANNA_LEARN, REFERRED_BY, MESSAGE]
    var package = "[" 
    + TIME + ", " 
    + NAME + ", " 
    + INSTA_ID + ", " 
    + IP_ADDR + ", " 
    + WANNA_LEARN + ", " 
    + REFERRED_BY + ", " 
    + MESSAGE + 
    "]";

    // show disclaimer
    disc_alert();

    // validate all required entries are filled
    if (NAME != "" && INSTA_ID != "" && EDU.checked == true && PRIV.checked == true) {
        // continue
        refer(package);
    }
    else {
        alert("Please fill out all required fields.")
    }
}

function httpGet(url)
{
    // synchronous request
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function refer(package) {
    // Send registrant details to post
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://server-hh.000webhostapp.com/post.php?" + package;

    /*fetch(url)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch((error) => alert(error + ". An error occurred. Please try again."));*/

    httpGet(url);
}

function time_now() {
    // get current date
    var currentdate = new Date(); 
    var time = (currentdate.getMonth() + 1) + "/"
            + currentdate.getDate()  + "/" 
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
    return time;
}

function disc_alert() {
    alert("I, the creator, am in no way responsible for any actions that you may make using the given knowledge, share or software. You take full responsibility with any action taken using the given knowledge, share or software. Please take note that the resources shared was designed for educational purposes and should never be used maliciously. By continuing, you automatically accept this agreement.");
}

function get_addr() {
    fetch("https://ipinfo.io/json")
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        var ip_addr = data.ip;
        document.getElementById("addr").innerHTML = ip_addr;
    })
    .catch(function(error) {
        alert("Could not connect to API. Please try again.")
    });
}
