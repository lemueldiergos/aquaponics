var form_main = document.getElementsByClassName("main-form")[0];
var logo      = document.getElementsByClassName("logo")[0];
var LGBTN     = document.getElementsByClassName("login_btn")[0];
var ALERT_ID  = document.getElementById("alert");

var UN        = document.getElementById("username");
var PN        = document.getElementById("password");

var opener_state = true;

// DEFAULT SETTINGS

const USERN = "admin";
const PASSN = "aquaponics";

form_main.style.marginBottom = "-600px";
logo.style.flexGrow          = "3";
ALERT_ID.style.marginTop     = "-100px";


LGBTN.addEventListener('click', function() {
    if(opener_state) {
        opener_state = false;
        form_main.style.marginBottom = 0;
        logo.style.flexGrow          = 0.2;
    } else {
        opener_state = true;
    }
});

var login_temp =()=> {
    if(USERN == UN.value && PASSN == PN.value) {
        window.location.href = "index.html";
    } else {
        ALERT_ID.style.marginTop     = "5%";
    }
}