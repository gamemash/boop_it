"use strict";
var Howl = require('howler').Howl;
var Song = require('./song.js');
var _ = require('underscore');


var currentTime; // The current song time. A number between 0 and 4.
var n = 0; // Frame counter

function draw() {
  requestAnimationFrame(draw);
  // process1_60();
  currentTime = Song.currentTime();

  document.getElementById("currentTime").innerHTML = currentTime;

  if (currentTime > 0 && currentTime < 0.02) { beat(1); }
  if (currentTime > 0.5 && currentTime < 0.52) { beat(2); }
  if (currentTime > 1.00 && currentTime < 1.02) { beat(3); }
  if (currentTime > 1.5 && currentTime < 1.52) { beat(4); }
  if (currentTime > 2.00 && currentTime < 2.02) { beat(5); }
  if (currentTime > 2.5 && currentTime < 2.52) { beat(7); }
  if (currentTime > 3.00 && currentTime < 3.02) { beat(7); }
  if (currentTime > 3.5 && currentTime < 3.52) { beat(8); }
}

function beat() {
  var beatResponsiveElements = document.getElementsByClassName("beatResponsive");

  _.each(beatResponsiveElements, (element) => {
    console.log(element);
    element.className += " beat";
  });

  setTimeout(function() {
    _.each(beatResponsiveElements, (element) => {
      element.className = "beatResponsive";
    });
  }, 200);
}

function init() {
  // Start the game
  Song.play();
  draw();
}

init();