var loadingimage;

var loadState={

preload: function(){

	game.load.image('background', 'assets/level-1.jpg');
	game.load.image('apple', 'assets/Apple.png');
	game.load.image('jeszczeraz', 'assets/Spiejl_no_amol.png');
	game.load.image('koniecgry', 'assets/Koniec_gry.png');
	game.load.image('loading', 'assets/loading.png');
	game.load.image('swietlik', 'assets/swietlik.png');
	game.load.spritesheet('mond', 'assets/mond3_move.png',104,159);
	game.load.image('play_button', 'assets/Spiejl.png');
	game.load.image('menu_logo', 'assets/Napis_tyt.png');
	game.load.image('tiles','assets/tiles30.png');
	game.load.tilemap('mapa', 'assets/tilemap.csv', null, Phaser.Tilemap.CSV);
	//game.stage.backgroundColor = '#0f0f0f';
}

,create: function(){
	loadingimage=game.add.sprite(game.world.centerX,game.world.centerX, 'loading');
	loadingimage.anchor.setTo(0.5,0.5);
	game.state.start('menu');
}
,update: function(){
loadingimage.angle += 1;
}

}