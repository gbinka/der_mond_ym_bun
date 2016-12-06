
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
var round;
var coords;
var start_y;
var animation = 'left'; 
var last_animation='right';
var last_deadline;
var tile_kill=20;
var swy=0;
var swy_dir='up';
var falldown=false;


var playState={

create:function(){
	game.stage.backgroundColor = '#000000';
	bg = game.add.tileSprite(0, 0, 600, 750, 'background');
   	bg.fixedToCamera = true;
   
	map = game.add.tilemap('mapa',30,30);

	start_y=map.height*30-100;
  last_deadline=map.height;
	map.addTilesetImage('tileset','tiles');

  
  
   layer = map.createLayer(0);
   layer.resizeWorld();
   //layer.debug=true;
   this.setTileCollision(layer, [1,2,3], {
        top: true,
        bottom: false,
        left: false,
        right: false
    });


   apples = game.add.group();

   apples.enableBody = true;

    
    for (var i = 0; i < 3; i++)
    {
        var apple = apples.create(i * 200+100, 0, 'apple');
        apple.body.gravity.y = 6;
        apple.body.bounce.y = 0.2 + Math.random() * 0.2;
    }


   game.physics.arcade.gravity.y = 650;
   
   swietlik = game.add.sprite(380,1200,'swietlik');
   game.physics.enable(swietlik, Phaser.Physics.ARCADE);
   swietlik.body.collideWorldBounds = true;
   swietlik.body.bounce.setTo(1, 1);
   swietlik.body.velocity.x=100;

   swietlik.body.allowGravity =false;

   player = game.add.sprite(380,start_y,'mond');
   game.physics.enable(player, Phaser.Physics.ARCADE);

   player.body.setSize(65,157,28,2);
   player.body.bounce.y = 0.3;
   player.body.collideWorldBounds = true;
   player.body.acceleration=2;
   player.animations.add('left', [0], 8, true);
   player.animations.add('jump_left', [0], 10, true);
   player.animations.add('right', [1], 8, true);
   player.animations.add('jump_right', [1], 10, true);
   player.anchor.setTo(0.5, 0.5);
   //game.camera.follow(player);
       game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //  Listen for this signal to reset once the fade is over
    game.camera.onFadeComplete.add(this.resetFade, this);

    game.input.onDown.add(this.fade, this);
   cursors = game.input.keyboard.createCursorKeys();
   jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
   score = game.add.text(550, 50, "punkty",style);
   coords = game.add.text(550, 150, "x,y",style);
   coords.fixedToCamera = true;
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
    game.physics.arcade.overlap(swietlik, player, this.falldown, null, this);
    game.physics.arcade.collide(player, layer);
  }
  if (round>0){
    round-=1;
    player.angle+=12;
  }

    punkty=parseInt(Math.abs(map.height*30-player.body.y-100).toFixed(0))
    if(punkty_max<punkty){
    	punkty_max=punkty;
    }
    score.setText(punkty_max);

    
    //koniec gry jeśli spadnie na dno
    if (punkty_max>500 && player.y+100>start_y){
       
      this.falldown();
    }

    //kasowanie kafelkow
    var y=Math.floor(player.y/30);
      coords.setText(start_y-player.y);
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
  swietlik.body.velocity.y=swy;


    

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

    
    if(start_y-player.y<-200){
        this.gameover();
      }

}

,appleEaten(player,thing){
	punkty_max=0;
	punkty=0;
  thing.kill();
	player.body.velocity.y = -850;
  round=60;

}

,render(){
  //game.debug.body(player);
}
,gameover(){
      falldown=false;
      player.angle+=180;
      player.body.collideWorldBounds = true;
      punkty_max=0;
      game.state.start('gameover');
}

,falldown(){
      falldown=true;
      player.angle+=180;
      player.body.collideWorldBounds = false;
      
}
, setTileCollision(mapLayer, idxOrArray, dirs) {
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