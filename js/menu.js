var menu_image;
var log;
var menuState={



create: function(){
	menu_image=game.add.sprite(game.world.centerX,game.world.centerX, 'menu_logo');
	menu_image.anchor.setTo(0.5,0.5);
	playbutton=game.add.button(game.world.centerX,1200, 'play_button',this.start,this);
	playbutton.anchor.setTo(0.5,0.5);

}
,start: function(){
	game.state.start('play',true,false,[1]);

}

}