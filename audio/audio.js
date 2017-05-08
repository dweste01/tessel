var path = require('path');
var av = require('tessel-av');
var mp3 = path.join(__dirname, 'yoda-mudhole.mp3');
// var sound = new av.Speaker(mp3);


// sound.on('ended', function(seconds) {
//   sound.play();
// });

module.exports = {
	brightSong: new av.Speaker(path.join(__dirname, 'all-star-short.mp3')),
	darkSong: new av.Speaker(path.join(__dirname, 'lets-get-it-on-short.mp3'))
};