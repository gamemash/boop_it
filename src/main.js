"use strict";
require('./vendor/howler.js');



var bass = new Howl({
  src: ['./sounds/bass.wav'],
  loop: true
});

var beat1 = new Howl({
  src: ['./sounds/beat1.wav'],
  loop: true
});

var beat2 = new Howl({
  src: ['./sounds/beat2.wav'],
  loop: true
});

var beat2 = new Howl({
  src: ['./sounds/beat2.wav'],
  loop: true
});

var beepboop = new Howl({
  src: ['./sounds/beepboop.wav'],
  loop: true
});

var guitar = new Howl({
  src: ['./sounds/guitar.wav'],
  loop: true
});

var keys = new Howl({
  src: ['./sounds/keys.wav'],
  loop: true
});

// bass.play();
beat1.rate(1.0);
beepboop.rate(1.0);
// beat1.play();
beepboop.volume(0.1);
// beepboop.play();
guitar.volume(0.9);
// guitar.play();
// keys.play();


// sounds.beat1.addEventListener('ended', function() {
//   this.currentTime = 0;
//   this.play();
// }, false);

function draw() {
  requestAnimationFrame(draw);
  var currentTime = beat1.seek();
  beepboop.seek(currentTime);
  document.getElementById("currentTime").innerHTML = currentTime;
}
draw();

window.buttonDown = function() {
  beepboop.play();
  beat1.rate(beat1.rate() + 0.05);
  beepboop.rate(beat1.rate() + 0.05);
}

window.buttonUp = function() {
  beepboop.stop();
}