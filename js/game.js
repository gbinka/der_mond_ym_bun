var game = new Phaser.Game(1200,1500, Phaser.CANVAS, 'der_mond',null,true);

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    custom: {
      families: ['latoblack','etnocyfraregular'],

    }

};

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('gameover',gameOverState);
game.state.add('quiz',quizState);
game.state.add('fake_load',fakeLoadState);

game.state.start('boot');