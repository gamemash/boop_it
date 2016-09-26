"use strict";
var Howl = require('howler').Howl;
var Song = require('./song.js');
var _ = require('underscore');
var sfx = {};

var actionLabels = [
  "boop_it",
  "klerp_it",
  "twablang_it",
  "you_lost"
];

_.each(actionLabels, (sound) => {
  sfx[sound] = new Howl({
    src: ['./sounds/'+ sound +'.wav'],
    loop: false
  });
});


var currentTime; // The current song time. A number between 0 and 4.
var n = 0; // Frame counter
var beatInterval = 0.5;
var songLength = 4;
var numberOfBeats = 4 / beatInterval;
var activeAction = undefined;
var score = 0;

function draw() {
  requestAnimationFrame(draw);
  // process1_60();
  currentTime = Song.currentTime();

  // Song.sync();

  for (var i = 0; i < numberOfBeats; i++) {
    var beatFactor = (currentTime / beatInterval) % 1;
    if (beatFactor > 0 && beatFactor < 0.04) { beat(Math.floor(currentTime / beatInterval) + 1 ); }
  }
}

function onABeat() {
  for (var i = 0; i < numberOfBeats; i++) {
    var beatFactor = (currentTime / beatInterval) % 1;
    if (beatFactor > 0 && beatFactor < 0.08) { return true }
    if (beatFactor > 0.92 && beatFactor < 1.00) { return true }
  }
  console.log((currentTime / beatInterval) % 1)
}

function beat(n) {
  var beatResponsiveElements = document.getElementsByClassName("beatResponsive");

  _.each(beatResponsiveElements, (element) => {
    element.className += " beat beat" + n;
  });

  setTimeout(function() {
    _.each(beatResponsiveElements, (element) => {
      element.className = "beatResponsive";
    });
  }, 200);

  if (n % 4 === 1 && activeAction === undefined) {
    var actions = ['boop', 'klerp', 'twablang'];

    activeAction = actions[Math.floor(Math.random() * actions.length)];
    sfx[activeAction + "_it"].play();

    console.log(activeAction);
    document.getElementById("activeAction").innerHTML = activeAction + " it!";
  }

  if (n % 4 === 0 && activeAction != undefined) {
    Song.stop();
    console.log("YOU LOST");
    sfx["you_lost"].play();
    document.getElementById("activeAction").innerHTML = "YOU LOST! Boop it to try again."
  }
}

function init() {
  // Start the game
  // Song.play();
  draw();
}

window.buttonDown = function() {
  Song.rateUp();
}

window.buttonUp = function() {
  // Song.rateUp();
}

window.checkAction = function(action) {
  if (Song.isPlaying()) {
    if (activeAction === action) {
      activeAction = undefined;
      document.getElementById("activeAction").innerHTML = "";
      score += 1;
      document.getElementById("score").innerHTML = score;
      Song.rateUp();

      // if (score % 4 === 0) {
      //   Song.complexityUp();
      // }i=
    } else {
      Song.stop();
      console.log("YOU LOST");
      sfx["you_lost"].play();
      document.getElementById("activeAction").innerHTML = "YOU LOST! Boop it to try again."
    }
  } else {
    score = 0;
    activeAction = undefined;
    Song.play();
  }
}

init();