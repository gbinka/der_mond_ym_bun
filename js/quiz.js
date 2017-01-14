var quiztween;
var quizimages=Array();
var textfields=Array();
var lastclicked=null;
var texts=Array();
var answered=1;
var punkty_max=0;

var quizState={


init: function(parms){
punkty_max=parms[0];
}

,create: function(){

	this.createImages();
	var instr = game.add.sprite(game.world.centerX, game.world.centerY, 'quizinstr');

    instr.anchor.setTo(0.5, 0.5);
    instr.alpha = 0;
    var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    score = game.add.text(300, 10, punkty_max,style);

    score.fixedToCamera = true;
	//score.cameraOffset.setTo(10, 300);
	score.setText(punkty_max);
    //quiztween=game.add.tween(instr).from( { alpha: 1 }, 3000, Phaser.Easing.Quintic.Out, false, 0, 0, false);

}
,update: function(){

}
,createImages: function(){
	var style = { font: "24px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 148, align: "center" };

	//var images=[['auto.png','car'],['aparat.png','camera'],["chleb pisanka.png",'bread'],["buty.png",'shoes'],["chmura.png",'cloud'],["drzewo.png",'tree'],["filizanka.png",'cup'],["grzebień.png",'comb']]; //,"dom.png","jablco.png","JAJO.png","kapelisz.png","kapusta.png","kot.png","krzeslo.png","ksiezyc.png","książka.png","kurtka.png","kwiat2.png","kwiat.png","lyzka.png","marchew.png","motylek2.png","noz.png","pies.png","plot.png","pomidor.png","ppieniadze.png","rower.png","skrzynia.png","slonce.png","stol.png","walizka.png","wiadro.png"];
	
    var images=[['auto.png','s’oüta'],['aparat.png','dy fotogrȧfimȧśin'],["chleb pisanka.png",'s’brut'],["buty.png",'dy śü'],["chmura.png",'s’gywylk'],["drzewo.png",'der boüm'],["filizanka.png",'s’typła'],["grzebień.png",'der komb'],["dom.png","dy hyt"],["jablco.png","der opuł"],["JAJO.png","s’e"],["kapelisz.png","der hüt"],["kapusta.png","s’kroüt"],["kot.png","dy koc"],["krzeslo.png","der śtül"],["ksiezyc.png","der mönd"],["książka.png","s’bihła"],["kurtka.png","dy jak"],["kwiat2.png","s’błimła"],["kwiat.png","s’błimła"],["lyzka.png","der łefuł"],["marchew.png","dy mjen"],["motylek2.png","der mulkjadrymuł"],["noz.png","s’maser"],["pies.png","der hund"],["plot.png","der coün"],["pomidor.png","der pȧrȧdȧjsopuł"],["ppieniadze.png","s’giełd"],["rower.png","s’rod"],["skrzynia.png","dy łod"],["slonce.png","dy zun"],["stol.png","der tejś"],["walizka.png","dy walizk"],["wiadro.png","s’amper"]];

	var slots=[[101,20],[401,20],[101,187],[401,187],[101,374],[401,374],[101,561],[401,561]];

	

	for (var i = 1; i < 5; i++) {

		var rnd_im=Math.floor(Math.random()*images.length);
		var rnd_slot=Math.floor(Math.random()*slots.length);
		x=slots[rnd_slot][0];
		y=slots[rnd_slot][1];
		img=images[rnd_im];
		var ob=game.add.sprite(x, y, 'quizimages', img[0]);
		ob.wilamowski=img[1];
		ob.inputEnabled = true;

	    ob.events.onInputDown.add(this.imgtinter, this);
	    quizimages.splice(0,0,ob);
		images.splice(rnd_im,1);
		slots.splice(rnd_slot,1);

		var rnd_slot=Math.floor(Math.random()*slots.length);
		x=slots[rnd_slot][0];
		y=slots[rnd_slot][1];
		var textfield = game.add.sprite(x, y, 'black_148', img[0]);
		

		textfield.wilamowski=img[1];
		textfield.inputEnabled = true;

		textfield.events.onInputDown.add(this.imgtinter, this );

		text = game.add.text(textfield.x+textfield.width/2, textfield.y+textfield.height/2, img[1], style);
		textfields.splice(0,0,textfield);
		texts.splice(0,0,[img[1],text]);

		text.anchor.setTo(0.5, 0.5);
		//text.addColor('#00ffb4',0);
		
		
		slots.splice(rnd_slot,1);

	}

}
,imgtinter: function(im){

	if (lastclicked && lastclicked!=im && lastclicked.wilamowski==im.wilamowski){
		for (var k=0;k<texts.length;k++){
			if (texts[k][0]==im.wilamowski){
				texts[k][1].destroy();
			}
		}
		im.destroy();
		lastclicked.destroy();
		answered++;
		if (answered==5){
			answered=1;
			game.state.start('play',true,false,[2,true]);
		}
	lastclicked=null;
	for (var g=0;g<quizimages.length;g++){
		quizimages[g].tint=0xffffff;
		textfields[g].tint=0xffffff;
	}
	}
	else if (lastclicked){
		for (var g=0;g<quizimages.length;g++){
		quizimages[g].tint=0xffffff;
		textfields[g].tint=0xffffff;
	}
	lastclicked=null;
	}
	else{
	im.tint=0xffe23e;
	lastclicked=im;
	}
}


}