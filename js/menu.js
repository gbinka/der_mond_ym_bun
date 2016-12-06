var loadingimage;

var menuState={



create: function(){
	loadingimage=game.add.sprite(game.world.centerX,game.world.centerX, 'menu_logo');
	loadingimage.anchor.setTo(0.5,0.5);
	playbutton=game.add.button(game.world.centerX,600, 'play_button',this.start,this);
	playbutton.anchor.setTo(0.5,0.5);

}
,start: function(){
	game.state.start('play')

}

}