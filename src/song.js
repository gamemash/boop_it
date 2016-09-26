var _ = require('underscore');

var sounds = {};

var soundLabels = [
  'beat2',
  'beat2',
  'beat1',
  'beepboop',
  'keys'
];

_.each(soundLabels, (sound) => {
  sounds[sound] = new Howl({
    src: ['./sounds/'+ sound +'.wav'],
    loop: true
  });
});

var rate = 1;
var complexity = 1;

var Song = {
  play: function() {
    rate = 1;
    sounds[soundLabels[0]].rate(1);
    sounds[soundLabels[0]].play();
  },

  complexityUp: function() {
    sounds[soundLabels[complexity]].play();
    complexity += 1;
  },

  stop: function() {
    complexity = 1;

    _.each(soundLabels, function(soundLabel) {
      sounds[soundLabel].stop();
    });
  },

  isPlaying: function() {
    return sounds[soundLabels[0]].playing();
  },

  sync: function() {
    _.each(soundLabels, function(soundLabel) {
      sounds[soundLabel].seek(Song.currentTime());
    });
  },

  rateUp: function(rateIncrement) {
    rate += 0.01 || rateIncrement;
    sounds[soundLabels[0]].rate(rate);
  },

  currentTime: function() {
    if (sounds[soundLabels[0]].seek() > 0) {
      return sounds[soundLabels[0]].seek();
    } else {
      return 0
    }
  }
}

module.exports = Song;