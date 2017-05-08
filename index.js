// Import the interface to Tessel hardware
var tessel = require('tessel');
var ambient = require('./ambient/ambient.js');
var audio = require('./audio/audio.js');
var servo = require('./servo/servo.js');
var bright;
var dark;
var dance;

// Turn one of the LEDs on to start.
tessel.led[2].on();

// Blink!
setInterval(function () {
  tessel.led[2].toggle();
  tessel.led[3].toggle();
}, 100);

var servo1 = 1;

servo.on('ready', function() {
	ambient.on('ready', function () {
		servo.configure(servo1, 0.05, 0.12, function () {
			var brightDance, darkDance;
			setInterval( function () {
			    ambient.getLightLevel( function(err, lightdata) {
			      if (err) throw err;
			      console.log("Light level:", lightdata.toFixed(8));
			      if (lightdata.toFixed(8)>0.02 && !bright) {
			      	bright = true;
			       	if (dark) {
			       		audio.darkSong.stop();
			       		dark = false;
			       	}
			       	audio.brightSong.play();
			       	dancing(477);
			    } else if(lightdata.toFixed(8)<=0.02 && !dark) {
			    	dark = true;
			    	if (bright) { // check if switching over
			    		audio.brightSong.stop();
			    		bright = false;
			    	}
			    	audio.darkSong.play();
			    	dancing(918);			    	    
			    	}
			    });
			  }, 500); // The readings will happen every .5 seconds
			});
		})
});
 


function dancing(interval) {
	console.log("in dancing function");
	if (dance) clearInterval(dance);
	var position = 0;
	dance = setInterval(function () {
		console.log('in setInterval');
		servo.move(servo1, position);
			if (position == 0) {
			   	position = 1;
			}
			else if (position == 1) {
			    position = 0; // Reset servo position
			}
		}, interval);
}

ambient.on('error', function (err) {
  console.log(err);
});
