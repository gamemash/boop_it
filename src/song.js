var _ = require('underscore');

var sounds = {};

var soundLabels = [
  'beat1',
  'beat2',
  'bass',
  'beepboop',
  'guitar',
  'keys'
];

_.each(soundLabels, (sound) => {
  sounds[sound] = new Howl({
    src: ['./sounds/'+ sound +'.wav'],
    loop: true
  });
});

var rate = 1;

var Song = {
  play: function() {
    rate = 1;
    sounds.beat2.rate(1);
    sounds.beat2.play();
  },

  stop: function() {
    sounds.beat2.stop();
  },

  isPlaying: function() {
    return sounds.beat2.playing();
  },

  rateUp: function(rateIncrement) {
    rate += 0.01 || rateIncrement;
    sounds.beat2.rate(rate);
  },

  currentTime: function() {
    if (sounds.beat2.seek() > 0) {
      return sounds.beat2.seek();
    } else {
      return 0
    }
  }
}

module.exports = Song;