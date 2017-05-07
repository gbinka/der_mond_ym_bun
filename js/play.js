
var map;
var layer;
var player;
var swietlik;
var apple;
var cursors;
var bg;
var jumpTimer = 0;
var moveTimer = 0;
var transTimer = 0;
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
var animation = 'idle_left'; 
var last_animation='idle_right';
var last_deadline;
var tile_kill=25;
var swy=0;
var swy_dir='up';
var helpers=0;
var helpers_dir='up';
var falldown=false;
var map_h;
var player_last_coords;
var jump_power;
var respawny_gid;
var fadeOut;
var falldown_timer;
var grav;
var lives=3;
var lives_display;
var mapa;
var level=1;
var ficzery_frames={3:'marchewka', 6:'gruszka',7:'sliwka',2:'jezyna',1:'burak',0:'jablko',5:'winogrona',8:'ziemniak',4:'wisnia'};
var music;
var movement_velocity=100;


var playState={

init:function(parm){
  var level=parm[0];
  start_y=false;
  game.stage.backgroundColor = '#000000';
  falldown_timer=0;
  mapa='mapa_level'+level;
  bg_image='background'+level;
  round=0;
  if(level==1){
    
    grav= 600;
    jump_power=-600;
    base_movement_velocity=230;
    get_jump_power=function(){return jump_power}
    get_movement_velocity=function(){return base_movement_velocity}
  }
  else if (level==2){
    grav = 1275;
    jump_power=-870;
    base_movement_velocity=320;
    get_jump_power=function(){return jump_power -6*Math.sqrt(movement_velocity);}
    get_movement_velocity=function(){return base_movement_velocity+5*moveTimer;}
  }

  bg = game.add.tileSprite(0, 0, 1200, 2749, bg_image);
  bg.fixedToCamera = true;
  bg.aplha=1;
  if (parm[1]==true){
    start_y=[player_last_coords[0],player_last_coords[1]]
  }
  else
    player_last_coords=null;
}
,create:function(){
	
  fadeOut=game.add.tileSprite(0,0,1200,1500,'black_1200');
  fadeOut.alpha=0;
  fadeOut.fixedToCamera = true;
  game.physics.arcade.gravity.y=grav;


	map = game.add.tilemap(mapa);
  map_h=map.height*60-300;
  respawny_gid=map.objects['Respawny'][0]['gid'];

  if(!start_y){
	start_y=[380,map_h];
  }
  if (!player_last_coords){
    player_last_coords=start_y
  }
  


  last_deadline=map.height;

	map.addTilesetImage('stopnie','tiles');
  
  
   layer = map.createLayer('Stopnie');
   layer.resizeWorld();
   //layer.debug=true;
   this.setTileCollision(layer, [2,3,4,5], {
        top: true,
        bottom: false,
        left: false,
        right: false
    });




var ficzery_gids={11:4,12:5,7:0,6:8,8:1,14:7,13:6,9:2,10:3};

//Pomagacze
 var used_values=[];
  apples = game.add.group();
  apples.enableBody = true;
  for (var i=0, len = map.objects['Ficzery'].length;i<len;i++){
    gid=map.objects['Ficzery'][i]['gid'];

    if(used_values.indexOf(gid) == -1){
      map.createFromObjects('Ficzery', gid, 'pomagacze', ficzery_gids[gid], true, false, apples);
      used_values.push(gid);
    }
  }

  for (var i = 0, len = apples.children.length; i < len; i++) { 
    var apple=apples.children[i];
    apple.body.allowGravity=false;
  } 
  
  respawny = game.add.physicsGroup();
  map.createFromObjects('Respawny', respawny_gid, 'blank', null, true, false, respawny);

  for (var i = 0, len = respawny.children.length; i < len; i++) { 
    var resp=respawny.children[i];
    resp.body.allowGravity=false;
  } 
   
   swietliki = game.add.physicsGroup();
   swietliki.enableBody = true;

   map.createFromObjects('Przeszkadzacze', 15, 'swietlik', 0, true, false, swietliki);
   for (var i = 0, len = swietliki.children.length; i < len; i++) { 
    var swi=swietliki.children[i];
    swi.body.bounce.setTo(1, 1);
  } 
   game.physics.enable(swietliki, Phaser.Physics.ARCADE);



   player = game.add.sprite(start_y[0],start_y[1],'mond');
   game.physics.enable(player, Phaser.Physics.ARCADE);

   player.body.setSize(125,314,45,4);
   player.body.bounce.y = 0.3;
   player.body.collideWorldBounds = true;
   player.body.acceleration=2;
   player.animations.add('left', [3,4,3,4,3,4,3,2,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3], 8, true);
   player.animations.add('jump_left', [0], 10, true);
   player.animations.add('right', [5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,6], 8, true);
   player.animations.add('jump_right', [9], 10, true);
   player.animations.add('idle_right', [6,6,6,6,6,6,6,6,6,6,7,7,8,8,7,8,7,6,6,6,6,7,8,7], 10, true);
   player.animations.add('idle_left', [3,3,3,3,3,3,3,2,2,2,3,3,1,1,2,3,3,2,1,1], 10, true);
   player.anchor.setTo(0.5, 0.5);
   game.camera.follow(player);
   //game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

   game.camera.onFadeComplete.add(this.resetFade, this);
   game.input.onDown.add(this.fade, this);

   cursors = game.input.keyboard.createCursorKeys();
   jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   var style = { font: "bold 50px etnocyfraregular", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
   score = game.add.text(1050, 50, punkty_max,style);

   score.fixedToCamera = true;
	score.cameraOffset.setTo(1050, 50);
  player.animations.play('idle_left');
  this.renderLives();
  if(music)
    music.stop();
  music=game.sound.play('music1',1,true);
  //layer.debug = true;
  
	game.time.advancedTiming = true;
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
  bg.tilePosition.y =-player.body.y*1249/map_h;

  if (falldown==false){
    game.physics.arcade.overlap(swietliki, player, this.falldown, null, this);
    game.physics.arcade.collide(player, layer);
  }
  if (round>0){
    round-=1;
    player.angle+=12;
  }

    punkty=parseInt(Math.abs(map.height*60-player.body.y-455).toFixed(0))
    if(punkty_max<punkty){
    	punkty_max=punkty;
      //player_last_coords=[player.x,player.y-300]
      score.setText(punkty_max);
    }
    

    
    //koniec gry jeśli spadnie na dno
    if (player.body.velocity.y >1700 && falldown==false || (punkty_max>1800 && player.y-300>map_h && falldown==false) ){
       //if (player.y>player_last_coords[1])
          //player_last_coords=[player.x,player.y-300]
      this.falldown();
    }

    //kasowanie kafelkow
///    var y=Math.floor(player.y/60);
//
//    var offset=last_deadline-y;
//    if (offset>tile_kill){

//      for (var y=last_deadline; y>last_deadline-offset+tile_kill;y--){
//      for (var i = 0; i < 20; i++){
//        map.removeTile(i, y);
//     }
//    }
//      last_deadline=last_deadline-offset+tile_kill;
//    }

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
  
  // Helpers movements
   if (helpers_dir=='up')
    helpers+=2;
   else
    helpers-=2;
   if (helpers>50)
    helpers_dir='down';
   if (helpers<-50)
    helpers_dir='up';

  for (var i = 0, len = apples.children.length; i < len; i++) { 
    var apple=apples.children[i];
    apple.body.velocity.y=helpers;
  } 



    

  //ruchy gracza
    player.body.velocity.x=0;

    if((cursors.left.isDown || cursors.right.isDown)&&!(cursors.left.isDown && cursors.right.isDown) ){
      moveTimer+=1;
    }
    else{
      moveTimer=0;
    }
   
       if (cursors.left.isDown)
    {
        player.body.velocity.x = -get_movement_velocity();
		    if (facing != 'left')
        {
            animation='left';
            facing = 'idle_left';
        }

    }
    else if (cursors.right.isDown )
    {
        player.body.velocity.x = get_movement_velocity();
		if (facing != 'right')
        {
            
              animation='right';
            facing = 'idle_right';
        }

    }
    else if (game.time.now > jumpTimer){
      animation=facing;
    }

    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = get_jump_power();
        jumpTimer = game.time.now + 500;
          if (facing=='idle_left' && !cursors.left.isDown)
            animation='jump_left';
          else if (facing=='idle_right' && !cursors.right.isDown)
            animation='jump_right';
    }

    if(animation!=last_animation){
      player.animations.play(animation);
      last_animation=animation;
    }

    
    if(map_h-player.y<-400 || (falldown_timer>100 && game.time.now >falldown_timer )){
        this.gameover();
      }

}

,appleEaten:function(player,thing){
  
  if (game.time.now > transTimer){
    transTimer = game.time.now + 1000;
  }

  if(thing.finish!=undefined){
    game.sound.play('dzwieki_i_kto_tu');
    game.state.start('fake_load');
  }
  else
    game.sound.play('dzwieki_'+ficzery_frames[thing._frame.index]);

  var respawn=player_last_coords;

  for (var i = 0, len = respawny.children.length; i < len; i++) { 
    var resp=respawny.children[i];

    if (player.body.position.y<resp.body.position.y && respawn[1]>resp.body.position.y){
      respawn=[resp.body.position.x,resp.body.position.y];
    }

  } 
  
  player_last_coords=Array(respawn[0],respawn[1])
  thing.kill();
	player.body.velocity.y = thing.power*-(Math.sqrt(grav)/26.45);
  if (thing.power>100 && round==0)
    round+=60;

}

,render:function(){
  //game.debug.body(player);
  //game.debug.text(game.time.fps, 2, 114, "#00ff00");
}
,gameover:function(){
      falldown=false;
      player.angle=0;
      player.body.collideWorldBounds = true;

      lives-=1;
      
      if (lives<0){
        game.state.start('gameover',true,false,[punkty_max]);
      }
      else
        game.state.start('quiz',true,false,[punkty_max]);
}

,falldown:function(){
      game.sound.play('dzwieki_ojeruma_ratunku');
      falldown_timer = game.time.now + 2000;
      game.world.bringToTop(fadeOut);
      var tween = game.add.tween(fadeOut).to( { alpha: 1 }, 1000, "Linear", true, 1000);
      falldown=true;
      player.angle+=180;
      player.body.collideWorldBounds = false;
      
}

,renderLives:function(){
  lives_display = game.add.group();

    for (var i = 0; i < lives; i++)
    {
        lives_display.create(1020+60*i, 1400, 'mond_icon');
    }
  lives_display.fixedToCamera = true;

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