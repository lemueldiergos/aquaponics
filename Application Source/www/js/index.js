
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    navigator.splashscreen.hide();
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

// 001 SEARCH only ---------------------------------------
var ALERT_ID = document.getElementById("alert_ID");
var AG_ID = document.getElementById("alert_green_ID");


var closing = ()=> {
    ALERT_ID.style.marginTop = "-100px";
}


var closing_1 = ()=> {
    AG_ID.style.marginTop = "-100px";
}




var FCID        = document.getElementById("FCID");
var PHID        = document.getElementById("PHID");
var TSID        = document.getElementById("TSID");
var TESID       = document.getElementById("TESID");
var ASID        = document.getElementById("ASID");
var DOSID       = document.getElementById("DOSID");
var PWSID       = document.getElementById("PWSID");
var WLSID       = document.getElementById("WLSID");

var NAV_LIST    = document.getElementsByClassName("nav_list")[0];
var M_DEV       = document.getElementsByClassName("monitoring_dev")[0];
var BTN_F       = document.getElementsByClassName("btn_feed");
var CON_SET     = document.getElementsByClassName("CONNECTIVITY_SET")[0];

var CLOSER_STAT_NAV = false;
var LIGHT_STATE = true;
var CAMERA_SENSOR_SWITCH = true;
var FEED_SWITCH = true;

var SEN_SWITCH_ID = document.getElementById("SENSOR_MODE");
var CAM_SWITCH_ID = document.getElementById("CAMERA_MODE");
var CON_SWITCH_ID = document.getElementById("CONNECTION_MODE");

var WEBSOCKET_CHANGER_BTN = document.getElementById("SET_WEBSOCKET_ADDRESS");

var CON_TYPE_CHILD_BTN = document.getElementsByClassName("CON_TYPE_CHILD");
var SETTING_TYPE_LAN_S = document.getElementById("SETTING_TYPE_LAN");
var SETTING_TYPE_OLN_S = document.getElementById("SETTING_TYPE_OLN");

var about_nav = document.getElementsByClassName("about")[0];
var about_state_opener = true;

function about_btn() {
    if(!about_state_opener) {
        about_nav.style.display = "none";
        about_state_opener = true;
    }
    else {
        about_nav.style.display = "flex";
        about_state_opener = false;
    }
}

var nav_btn =()=> {
    if(CLOSER_STAT_NAV) {
        NAV_LIST.style.marginLeft = "-300px";
        CLOSER_STAT_NAV = false; 
    } else {
        NAV_LIST.style.marginLeft = 0;
        CLOSER_STAT_NAV = true;
    }
            
}

var AQCAM =()=> {
    if(CLOSER_STAT_NAV) {
        NAV_LIST.style.marginLeft = "-300px";
        M_DEV.style.display = "flex";
        CON_SET.style.display = "none";
        CLOSER_STAT_NAV = false; 
    } else {
        NAV_LIST.style.marginLeft = 0;
        M_DEV.style.display = "none";
        CLOSER_STAT_NAV = true;
    }
    
}

var WATQ =()=> {
    if(CLOSER_STAT_NAV) {
        NAV_LIST.style.marginLeft = "-300px";
        M_DEV.style.display = "none";
        CON_SET.style.display = "none";
        CLOSER_STAT_NAV = false; 
    } else {
        NAV_LIST.style.marginLeft = 0;
       
        CLOSER_STAT_NAV = true;
    }
}

var CONN =()=> {
    if(CLOSER_STAT_NAV) {
        NAV_LIST.style.marginLeft = "-300px";
        M_DEV.style.display = "none";
        CON_SET.style.display = "block";
        CLOSER_STAT_NAV = false; 
    } else {
        NAV_LIST.style.marginLeft = 0;
       
        CLOSER_STAT_NAV = true;
    }
}

// DEFAULT CSS
M_DEV.style.display = "none";

function isOpen(ws) { return ws.readyState === ws.OPEN }
    
    function setwebsocket() {
        var WEBSOCKET_NEW_IP    = document.getElementById("IPSET_WEBSOCKET").value;
        var WEBSOCKET_NEW_PORT  = document.getElementById("PORTSET_WEBSOCKET").value;
        console.log(WEBSOCKET_NEW_IP + " : " +WEBSOCKET_NEW_PORT); 
        if (!('WebSocket' in window)) { 
            alert('Your browser does not support web sockets'); 
        }else{ 
            var HOSTING = 'ws://' + WEBSOCKET_NEW_IP + ':' + WEBSOCKET_NEW_PORT;
            setup(HOSTING); 
        }
    }

    function setonlinewebsocket() {
        var ONLINEADD_NEW_WEBSOCKET  = document.getElementById("ONLINEADD_WEBSOCKET").value;
        console.log(ONLINEADD_NEW_WEBSOCKET); 
        if (!('WebSocket' in window)) { 
            alert('Your browser does not support web sockets'); 
            }else{ 
            var HOSTING = 'ws://' + ONLINEADD_NEW_WEBSOCKET;
            setup(HOSTING); 
            }
    }

   
     
    function setup(HOSTING_ARG) { 
        closing_1();
        var host = HOSTING_ARG;
        //var host = 'tcp://0.tcp.ap.ngrok.io:11872';
        console.log("connecting to " + HOSTING_ARG);
        var socket; 
        try{
            WebSocket.pluginOptions = {
                origin: "https://example.com",
                maxConnectTime: 3000,
                override: true,
            };
            socket = new WebSocket(host); 
        } catch(e) {
            //console.log(e);
            with(ALERT_ID) {
                style.marginTop = "10px";
                style.backgroundColor = "crimson";
                innerHTML       = e;
            }
            setTimeout(function() {
                socket = new WebSocket(host);
            }, 100); 
        }
        //var socket = new WebSocket(host); 
        socket.binaryType = 'arraybuffer'; 

        
        if(socket){ 
           

            socket.onopen = () => {
                ALERT_ID.style.marginTop = "-100px";
                console.log("Websocket connection established");
                with(ALERT_ID) {
                    style.marginTop = "10px";
                    innerHTML       = "Connected!";
                    style.backgroundColor = "rgb(14, 201, 120)";
                }
                setTimeout(function() {
                    ALERT_ID.style.marginTop = "-100px";
                }, 1000);
            }
        
            socket.onclose = () => {
                console.log("Websocket connection closed")
                setTimeout(function() {
                    setup();
                }, 100); 
            }
            
            socket.onerror = error => {
                ALERT_ID.style.marginTop = "10px";
                console.log(error)
            }


             BTN_F[0].addEventListener("click", ()=> {
                try {
                    if(LIGHT_STATE) {
                        if(!isOpen(socket))return;
                        socket.send('a');
                        BTN_F[0].innerHTML = "Light Off";
                        LIGHT_STATE = false;
                    } else {
                        if(!isOpen(socket))return;
                        socket.send('z');
                        BTN_F[0].innerHTML = "Light On";
                        LIGHT_STATE = true;
                    }
                } catch(e) {
                    with(ALERT_ID) {
                        style.marginTop = "10px";
                        style.backgroundColor = "crimson";
                        innerHTML       = "Server Closed, Please Reconnect!";
                    }
                    console.log("Error Cannot Open the light reconnect!");
                }
             });
             BTN_F[1].addEventListener("click", ()=> {
                try {      
                    if(CAMERA_SENSOR_SWITCH) {
                        socket.send('b');
                        BTN_F[1].innerHTML = "Pause Camera";
                        CAMERA_SENSOR_SWITCH = false;
                    } else {
                        socket.send('y');
                        BTN_F[1].innerHTML = "Monitor Fish";
                        CAMERA_SENSOR_SWITCH = true;
                    }
                } catch(e) {
                    with(ALERT_ID) {
                        style.marginTop = "10px";
                        style.backgroundColor = "crimson";
                        innerHTML       = "Cannot Switch Reconnect Please!";
                    }
                    console.log("Error Cannot Switch the Camera");
                }
             });

            


             CAM_SWITCH_ID.addEventListener("click", ()=> {
                    socket.send('b');
                    CAMERA_SENSOR_SWITCH = false;
             });
             SEN_SWITCH_ID.addEventListener("click", ()=> {
                socket.send('y');
                setTimeout(function() {
                    socket.send('z');
                    LIGHT_STATE = true;
                }, 100);
                CAMERA_SENSOR_SWITCH = true;
            });

            CON_SWITCH_ID.addEventListener("click", ()=> {
                socket.send('b');
            })
             

             BTN_F[2].addEventListener("click", ()=> {
                try {      
                    socket.send('c');
                    BTN_F[2].innerHTML = "Feeding";
                    setTimeout(function() {
                        socket.send('x');
                        BTN_F[2].innerHTML = "Feed";
                    }, 50);
                    /*
                    if(FEED_SWITCH) {
                        socket.send('c');
                        FEED_SWITCH = false;
                        BTN_F[2].innerHTML = "Stop Feeding";
                    } else {
                        socket.send('x');
                        FEED_SWITCH = true;
                        BTN_F[2].innerHTML = "Feed";
                    }
                    */
                } catch(e) {
                    with(ALERT_ID) {
                        style.marginTop = "10px";
                        style.backgroundColor = "crimson";
                        innerHTML       = "Cannot Switch Reconnect Please!";
                    }
                    console.log("Error Cannot Switch the Camera");
                }
             });

             BTN_F[3].addEventListener("click", ()=> {
                socket.send('d');
             });
            //socket.onopen = function(){}
            
            socket.onmessage = function(msg){
                var validate = msg.data;
                
                try {
                    var DAT = (msg.data);
                    FCID.innerHTML = DAT.split('x')[1];
                    TESID.innerHTML = DAT.split('x')[2];
                    ASID.innerHTML = DAT.split('x')[3];
                    WLSID.innerHTML = DAT.split('x')[4];
                    TSID.innerHTML = DAT.split('x')[5];
                    PHID.innerHTML = DAT.split('x')[6];
                    DOSID.innerHTML = DAT.split('x')[7];
                    let TOTAL_WAT = parseFloat(DAT.split('x')[9]) * parseFloat(DAT.split('x')[8]);
                    //console.log(parseFloat(DAT.split('x')[9]) + " X " + parseFloat(DAT.split('x')[8] + " = " + TOTAL_WAT.toFixed(2)));
                    PWSID.innerHTML = TOTAL_WAT.toFixed(2);
                    //res7.innerHTML = ;
                    /*
                    var splitter = validate.split("x");
                    if(splitter[0] == "#") {
                        console.log(splitter[2]);
                    }*/
                }   catch(e) {
                    //console.log(e);
                    var bytes = new Uint8Array(msg.data); 
                    var binary= ''; 
                    var len = bytes.byteLength; 
                    for (var i = 0; i < len; i++) { 
                        binary += String.fromCharCode(bytes[i]) 
                    } 
                    var img = document.getElementById('live'); 
                    img.src = 'data:image/jpg;base64,'+window.btoa(binary); 
                }
                
            }
    
    
            /*
            socket.onclose = function(){ 
                showServerResponse('The connection has been closed.'); 
            } */
        }
        window.onunload =()=> {
            socket.close();
        } 
    }
 

    // 002 PAGE 2 ---------------------------------------------------------------

    var CON_TYPE_SWITCH_STATE = false;
    CON_TYPE_CHILD_BTN[0].style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    CON_TYPE_CHILD_BTN[0].addEventListener("click", function() {
        if(CON_TYPE_SWITCH_STATE) {
            SETTING_TYPE_LAN_S.style.marginLeft = "0";
            SETTING_TYPE_OLN_S.style.marginLeft = "500px";
            CON_TYPE_CHILD_BTN[1].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            CON_TYPE_CHILD_BTN[0].style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            
            
            CON_TYPE_SWITCH_STATE = false;
        }
        console.log(CON_TYPE_SWITCH_STATE);
    })

    CON_TYPE_CHILD_BTN[1].addEventListener("click", function() {
        if(!CON_TYPE_SWITCH_STATE) {
            SETTING_TYPE_LAN_S.style.marginLeft = "-500px";
            SETTING_TYPE_OLN_S.style.marginLeft = "0";
            CON_TYPE_CHILD_BTN[0].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            CON_TYPE_CHILD_BTN[1].style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            CON_TYPE_SWITCH_STATE = true;
        }
        console.log(CON_TYPE_SWITCH_STATE);
    })
    