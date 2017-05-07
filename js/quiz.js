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
    var style = { font: "bold 29px latoblack", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    score = game.add.text(600, 10, punkty_max,style);

    score.fixedToCamera = true;
	//score.cameraOffset.setTo(10, 300);
	score.setText(punkty_max);
    //quiztween=game.add.tween(instr).from( { alpha: 1 }, 3000, Phaser.Easing.Quintic.Out, false, 0, 0, false);

}
,update: function(){

}
,createImages: function(){
	var style = { font: "32px latoblack", fill: "#ffffff", wordWrap: true, wordWrapWidth: 220, align: "center" };
	var style_small = { font: "25px latoblack", fill: "#ffffff", wordWrap: true, wordWrapWidth: 220, align: "center" };
	//var images=[['auto.png','car'],['aparat.png','camera'],["chleb pisanka.png",'bread'],["buty.png",'shoes'],["chmura.png",'cloud'],["drzewo.png",'tree'],["filizanka.png",'cup'],["grzebień.png",'comb']]; //,"dom.png","jablco.png","JAJO.png","kapelisz.png","kapusta.png","kot.png","krzeslo.png","ksiezyc.png","książka.png","kurtka.png","kwiat2.png","kwiat.png","lyzka.png","marchew.png","motylek2.png","noz.png","pies.png","plot.png","pomidor.png","ppieniadze.png","rower.png","skrzynia.png","slonce.png","stol.png","walizka.png","wiadro.png"];
	
    var images=[
['01.jpg','DY DŻINSAHÖZA'],
['02.jpg','DER DOÜMA'],
['03.jpg','DY DRESHÖZA'],
['04.jpg','DY CUNG'],
['05.jpg','DER ȦJSBAR'],
['06.jpg','DER ŚPJELIK'],
['07.jpg','S’BIHŁA'],
['08.jpg','DY ŁȦTER'],
['09.jpg','DY AKYS'],
['10.jpg','DY KAPÜCBLÜZ'],
['11.jpg','S’FANSTER'],
['12.jpg','DY FŁOŚ'],
['13.jpg','DER BANAN'],
['14.jpg','DER HOMER'],
['15.jpg','DY BANK'],
['16.jpg','S’FAD'],
['17.jpg','DY ȦNT'],
['18.jpg','DER BAR'],
['19.jpg','S’CÖKELA'],
['20.jpg','DY FON'],
['21.jpg','DER EROPLON'],
['22.jpg','S’BET'],
['23.jpg',' DER FŁIGJAPYŁC'],
['24.jpg','GYLOKTY ŁÖDA'],
['25.jpg','DER GIPS'],
['26.jpg','S’ YNGJELA'],
['27.jpg','DER GIÖERYL'],
['28.jpg','DY DRȦJEK'],
['29.jpg','DY GIÖERELIŚA TWȦGLA'],
['30.jpg','DY ĆEKÜLAD'],
['31.jpg','S’ GYŚENK '],
['32.jpg','DY KAN'],
['33.jpg','S’GYWYLK'],
['34.jpg','S’GYZYHT'],
['35.jpg','DY HANCKJA'],
['36.jpg','DER HIRYŚ'],
['37.jpg','DER KRUG'],
['38.jpg','DY HAND'],
['39.jpg','DER HȦLIKJY MIKOŁȦJ'],
['40.jpg','DER FÜS'],
['41.jpg','DY FŁOSTER'],
['42.jpg','DER KRAN'],
['43.jpg','DY KJYŚA'],
['44.jpg','DER OLIFANT'],
['45.jpg','DY GANS'],
['46.jpg','DER HON'],
['47.jpg','S’ÖWYTRYKLA'],
['48.jpg','S’PŁACŁA'],
['49.jpg','DY MȦJTKJA'],
['50.jpg','DY MYC'],
['51.jpg','DY NAS'],
['52.jpg','DER OŚOÜKOST'],
['53.jpg','S’OÜG'],
['54.jpg','S’HUNGFYŚŁA'],
['55.jpg','DY LARW'],
['56.jpg','DY LAMP'],
['57.jpg','DY ŁȦKSUŁ'],
['58.jpg','DER ŁYW'],
['59.jpg','DY ŁYPA'],
['60.jpg','S’ŁIHTŁA'],
['61.jpg','S’KYSŁA'],
['62.jpg','DER KYNGL'],
['63.jpg','DER KÜMIN'],
['64.jpg','S’HEMB'],
['65.jpg','DER ȦNȦNȦS'],
['66.jpg','DY KOROLN'],
['67.jpg','DY FOTOGRȦFIMȦŚIN'],
['68.jpg','S’OÜTA'],
['69.jpg','DY ŚÜ'],
['70.jpg','S’BRUT'],
['71.jpg','S’GYWYLK'],
['72.jpg','S’BEJGLȦJZA'],
['73.jpg','DY HYT'],
['74.jpg','DER BOÜM'],
['75.jpg','S’TYPŁA'],
['76.jpg','DER KOMB'],
['77.jpg','DER OPUŁ'],
['78.jpg','DER HÜT'],
['79.jpg','S’KROÜT'],
['80.jpg','DY WALIZK'],
['81.jpg','S’BȦN'],
['82.jpg','S’ROD'],
['83.jpg','DY ZUN'],
['84.jpg','S’E'],
['85.jpg','DY GOWUŁ'],
['86.jpg','DER ZȦGJER'],
['87.jpg','S’AMPER'],
['88.jpg','DER TEJŚ'],
['89.jpg','DY ŁOD'],
['90.jpg','DER PȦRȦDȦJSOPUŁ'],
['91.jpg','S’GIEŁD'],
['92.jpg','DY KOC'],
['93.jpg','DER ŚTÜL'],
['94.jpg','S’BIHŁA'],
['95.jpg','DER MÖND'],
['96.jpg','DY JAK'],
['97.jpg','S’BŁIMŁA'],
['98.jpg','DER ŁEFUŁ'],
['99.jpg','DY MJEN'],
['100.jpg','DER MULKJADRYMUŁ’'],
['101.jpg','S’MASER'],
['102.jpg','DER HUND'],
['103.jpg','DER COÜN'],
];

	var slots=[[0,515],[0,841],[324,515],[324,841],[648,515],[648,841],[972,515],[972,841]];

	

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
		var textfield = game.add.sprite(x, y, 'black_226', img[0]);
		
		if (img[1].length>=12)
			var style_used=style_small;
		else
			var style_used=style;
		textfield.wilamowski=img[1];
		textfield.inputEnabled = true;

		textfield.events.onInputDown.add(this.imgtinter, this );

		text = game.add.text(textfield.x+textfield.width/2, textfield.y+textfield.height/2, img[1], style_used);
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
			game.state.start('play',true,false,[level,true]);
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