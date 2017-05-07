var loadingimage;

var loadState={

start: function(){

	for (var i = 1; i<=2; i++) { 
    game.load.image('background'+i, 'assets/level-'+i+'_full.jpg');
    game.load.tilemap('mapa_level'+i, 'mapa.php?level='+i, null, Phaser.Tilemap.TILED_JSON);
  	} 
	game.load.image('black_1200', 'assets/black_1200.png');
	game.load.atlasJSONHash('pomagacze', 'assets/pomagacze/pomagacze_big.png', 'assets/pomagacze/pomagacze_big.json');
	game.load.image('jeszczeraz', 'assets/Spiejl_no_amol.png');
	game.load.image('koniecgry', 'assets/Koniec_gry.png');
	game.load.image('swietlik', 'assets/swietlik.png');
	game.load.spritesheet('mond', 'assets/mond3_move.png',202,318);
	game.load.image('mond_icon', 'assets/mond_icon.png');
	game.load.image('play_button', 'assets/Spiejl.png');
	game.load.image('menu_logo', 'assets/Napis_tyt.png');
	game.load.image('tiles','assets/tiles30.png');

	game.load.atlasJSONHash('quizimages', 'assets/domino/domino_big.jpg', 'assets/domino/domino_big.json');
	game.load.image('black_226', 'assets/black_226.png');
	game.load.image('quizinstr', 'assets/quiz_instr.png');
	game.load.image('blank', 'assets/blank3x3.png');

	//Sounds
	game.load.audio('music1',['media/krzyzok.mp3','media/krzyzok.ogg']);
	//game.load.audio('music2',['media/fil.mp3','media/fil.ogg']);
	game.load.audio('dzwieki_jablko',['media/jablko.mp3','media/jablko.ogg']);
	game.load.audio('dzwieki_burak',['media/burak.mp3','media/burak.ogg']);
	game.load.audio('dzwieki_gruszka',['media/gruszka.mp3','media/gruszka.ogg']);
	game.load.audio('dzwieki_jezyna',['media/jezyna.mp3','media/jezyna.ogg']);
	game.load.audio('dzwieki_kapusta',['media/kapusta.mp3','media/kapusta.ogg']);
	game.load.audio('dzwieki_marchewka',['media/marchewka.mp3','media/marchewka.ogg']);
	game.load.audio('dzwieki_sliwka',['media/sliwka.mp3','media/sliwka.ogg']);
	game.load.audio('dzwieki_winogrona',['media/winogrona.mp3','media/winogrona.ogg']);
	game.load.audio('dzwieki_wisnia',['media/wisnia.mp3','media/wisnia.ogg']);
	game.load.audio('dzwieki_ziemniak',['media/ziemniak.mp3','media/ziemniak.ogg']);
	game.load.audio('dzwieki_i_kto_tu',['media/i_kto_tu.mp3','media/i_kto_tu.ogg']);
	game.load.audio('dzwieki_ojeruma_ratunku',['media/ojeruma_ratunku.mp3','media/ojeruma_ratunku.ogg']);

	game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');


	game.load.onLoadComplete.add(this.loadComplete, this);
	game.load.start();
}

,create: function(){
	game.load.image('loading', 'assets/loading.png');
	game.load.onLoadComplete.add(this.startLoad, this);
	game.load.start();
	
	this.start();
	
}

,startLoad:function(){
loadingimage=game.add.sprite(game.world.centerX,game.world.centerX, 'loading');
	loadingimage.anchor.setTo(0.5,0.5);
}
,loadComplete:function(){
	game.state.start('menu');
}


,update: function(){
	if(loadingimage)
		loadingimage.angle += 1;
}

}