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

var Song = {
  play: function() {
    sounds.beat2.play();
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