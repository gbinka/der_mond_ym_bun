var game = new Phaser.Game(600,750, Phaser.CANVAS, 'der_mond',null,true);

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('gameover',gameOverState);
game.state.add('quiz',quizState);

game.state.start('boot');