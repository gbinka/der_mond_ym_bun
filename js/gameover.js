var loadingimage;
var playbutton;

var gameOverState={

create: function(){
	loadingimage=game.add.sprite(game.world.centerX,game.world.centerX, 'koniecgry');
	loadingimage.anchor.setTo(0.5,0.5);
	playbutton=game.add.button(game.world.centerX,600, 'jeszczeraz',this.start,this);
	playbutton.anchor.setTo(0.5,0.5);

}
,start: function(){
	game.state.start('play')

}
,update: function(){
//loadingimage.angle += 1;
}

}