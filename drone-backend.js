var Cylon = require('cylon');
//var ws = require('nodejs-websocket');


// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })

    .on("ready", fly)
.device("nav", {
    driver: "androne-nav",
    connection: "ardrone"
})
.on("ready",fly);

var bot;
// Fly the bot
function fly(robot) {
    bot = robot;
    bot.drone.config('general:navdata_demo', 'TRUE');
    bot.nav.on("navdata", function(data){
        //console.log(data);
    });
    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        // Drone is higher than 1.5 meters up
        if (altitude > 1.5) {
            bot.drone.land();
        }
    });
    bot.nav.on("batteryChange", function(data){
        console.log("Battery level:", data);
    });
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    after(10* 1000, function () {
        bot.drone.land();
    });
after(15*1000, function(){
    bot.drone.stop();
});
//jdk
}

Cylon.start();
