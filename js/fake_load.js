var timer, clocktext;
var clockseconds=5;

var fakeLoadState={

create: function(){
		level+=1;
		timer = game.time.create();
        timer.loop(Phaser.Timer.SECOND, this.updateDisplay, this);

        var style = { font: "bold 120px etnocyfraregular", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
   		clocktext = game.add.text(600, 750, clockseconds, style);
   		timer.start();
	
}

,updateDisplay: function() {

        clockseconds = clockseconds - 1;
        if (clockseconds==0)
        	game.state.start('play',true,false,[level,false]);

        clocktext.text =  clockseconds;
    }


,update: function(){
	

}

}