
var map;
var layer;
var player;
var swietlik;
var apple;
var cursors;
var bg;
var jumpTimer = 0;
var moveTimer = 0;
var jumpButton;
var tileset;
var punkty=0;
var punkty_max=0;
var score;
var facing;
var collidable;
var round=0;
var coords;
var start_y;
var animation = 'left'; 
var last_animation='right';
var last_deadline;
var tile_kill=25;
var swy=0;
var swy_dir='up';
var falldown=false;
var map_h;
var player_last_coords=Array(330,23250);


var playState={

init:function(parm){

  game.stage.backgroundColor = '#000000';
  if(parm[0]==1)
    bg_image='background';
  else if (parm[0]==2)
    bg_image='background2';
  bg = game.add.tileSprite(0, 0, 600, 750, bg_image);
  if (parm[1]==true){
    start_y=[player_last_coords[0],player_last_coords[1]]
  }
}
,create:function(){
	
   	bg.fixedToCamera = true;
   
	map = game.add.tilemap('mapa');
  map_h=map.height*30-100;

  if(!start_y){
	start_y=[380,map_h];
  }


  last_deadline=map.height;

	map.addTilesetImage('stopnie','tiles');

  
   layer = map.createLayer('Stopnie');
   layer.resizeWorld();
   //layer.debug=true;
   this.setTileCollision(layer, [2,3,4], {
        top: true,
        bottom: false,
        left: false,
        right: false
    });


   apples = game.add.group();

   apples.enableBody = true;

   

  map.createFromObjects('Ficzery', 6, 'pomagacze', 0, true, false, apples);
  map.createFromObjects('Ficzery', 7, 'pomagacze', 1, true, false, apples);
  map.createFromObjects('Ficzery', 8, 'pomagacze', 2, true, false, apples);
  map.createFromObjects('Ficzery', 9, 'pomagacze', 3, true, false, apples);  
  map.createFromObjects('Ficzery', 10, 'pomagacze', 4, true, false, apples); 
  map.createFromObjects('Ficzery', 14, 'pomagacze', 5, true, false, apples); 
  map.createFromObjects('Ficzery', 12, 'pomagacze', 6, true, false, apples); 
  map.createFromObjects('Ficzery', 11, 'pomagacze', 7, true, false, apples);


   game.physics.arcade.gravity.y = 650;
   
   swietliki = game.add.physicsGroup();
   swietliki.enableBody = true;
   map.createFromObjects('Przeszkadzacze', 15, 'swietlik', 0, true, false, swietliki);
   for (var i = 0, len = swietliki.children.length; i < len; i++) { 
    var swi=swietliki.children[i];
    swi.body.bounce.setTo(1, 1);
  } 
   //swietlik = game.add.sprite(380,1200,'swietlik');
   game.physics.enable(swietliki, Phaser.Physics.ARCADE);

   player = game.add.sprite(start_y[0],start_y[1],'mond');
   game.physics.enable(player, Phaser.Physics.ARCADE);

   player.body.setSize(65,157,28,2);
   player.body.bounce.y = 0.3;
   player.body.collideWorldBounds = true;
   player.body.acceleration=2;
   player.animations.add('left', [3,3,3,3,3,3,3,2,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,1,3,3,3], 8, true);
   player.animations.add('jump_left', [0], 10, true);
   player.animations.add('right', [4,4,4,4,4,4,4,5,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,6,6,4,4,4], 8, true);
   player.animations.add('jump_right', [7], 10, true);
   player.anchor.setTo(0.5, 0.5);
   //game.camera.follow(player);
       game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //  Listen for this signal to reset once the fade is over
    game.camera.onFadeComplete.add(this.resetFade, this);

    game.input.onDown.add(this.fade, this);
   cursors = game.input.keyboard.createCursorKeys();
   jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
   score = game.add.text(550, 50, punkty_max,style);

   score.fixedToCamera = true;
	score.cameraOffset.setTo(550, 50);
  player.animations.play('left');
  //layer.debug = true;
  
	
}
,fade:function(){
	game.camera.fade(0x000000, 4000);
}
,resetFade:function(){
	game.camera.resetFX();
}
,update:function(){
	
	game.physics.arcade.collide(apples, layer);
	game.physics.arcade.overlap(apples, player, this.appleEaten, null, this);
  

  if (falldown==false){
    game.physics.arcade.overlap(swietliki, player, this.falldown, null, this);
    game.physics.arcade.collide(player, layer);
  }
  if (round>0){
    round-=1;
    player.angle+=12;
  }

    punkty=parseInt(Math.abs(map.height*30-player.body.y-100).toFixed(0))
    if(punkty_max<punkty){
    	punkty_max=punkty;
      player_last_coords=[player.x,player.y-300]
      score.setText(punkty_max);
    }


    
    //koniec gry jeśli spadnie na dno
    if (player.body.velocity.y >1000 && falldown==false || (punkty_max>600 && player.y+100>map_h && falldown==false) ){
       //if (player.y>player_last_coords[1])
          //player_last_coords=[player.x,player.y-300]
      this.falldown();
    }

    //kasowanie kafelkow
    var y=Math.floor(player.y/30);

    var offset=last_deadline-y;
    if (offset>tile_kill){

      for (var y=last_deadline; y>last_deadline-offset+tile_kill;y--){
      for (var i = 0; i < 20; i++){
        map.removeTile(i, y);
     }
    }
      last_deadline=last_deadline-offset+tile_kill;
    }

  // Ruchy świetlika
   if (swy_dir=='up')
    swy+=3;
   else
    swy-=3;
   if (swy>100)
    swy_dir='down';
   if (swy<-100)
    swy_dir='up';

  for (var i = 0, len = swietliki.children.length; i < len; i++) { 
    var swi=swietliki.children[i];
    swi.body.velocity.y=swy;
  } 




    

  //ruchy gracza
    player.body.velocity.x=0;
   
       if (cursors.left.isDown)
    {
        player.body.velocity.x = -170;
		    if (facing != 'left')
        {
            animation='left';
            facing = 'left';
        }

    }
    else if (cursors.right.isDown )
    {
        player.body.velocity.x = 170;
		if (facing != 'right')
        {
            
              animation='right';
            facing = 'right';
        }

    }
    else if (game.time.now > jumpTimer){
      animation=facing;
    }
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -450;
        jumpTimer = game.time.now + 500;
          if (facing=='left')
            animation='jump_left';
          else if (facing=='right')
            animation='jump_right';
    }

    if(animation!=last_animation){
      player.animations.play(animation);
      last_animation=animation;
    }

    
    if(map_h-player.y<-200){
        this.gameover();
      }

}

,appleEaten:function(player,thing){
  thing.kill();
	player.body.velocity.y = thing.power*-1;
  round+=60;

}

,render:function(){
  //game.debug.body(player);
}
,gameover:function(){
      falldown=false;
      player.angle=0;
      player.body.collideWorldBounds = true;
      //punkty_max=0;
      game.state.start('quiz',true,false,[punkty_max]);
}

,falldown:function(){
      falldown=true;
      player.angle+=180;
      player.body.collideWorldBounds = false;
      
}
, setTileCollision:function(mapLayer, idxOrArray, dirs) {
    var mFunc; 
    if (idxOrArray.length) {
        mFunc = function(inp) {
            for (var i = 0; i < idxOrArray.length; i++) {
                if (idxOrArray[i] === inp) {
                    return true;
                }
            }
            return false;
        };
    } else {
        mFunc = function(inp) {
            return inp === idxOrArray;
        };
    }
    var d = mapLayer.map.layers[mapLayer.index].data;
     
    for (var i = 0; i < d.length; i++) {
        for (var j = 0; j < d[i].length; j++) {
            var t = d[i][j];
            if (mFunc(t.index)) {
                 
                t.collideUp = dirs.top;
                t.collideDown = dirs.bottom;
                t.collideLeft = dirs.left;
                t.collideRight = dirs.right;
                 
                t.faceTop = dirs.top;
                t.faceBottom = dirs.bottom;
                t.faceLeft = dirs.left;
                t.faceRight = dirs.right;
                 
            }
        }
    }
 
}



}