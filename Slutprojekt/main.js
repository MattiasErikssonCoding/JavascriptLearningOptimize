/**
 * Playing Asteroids while learning JavaScript object model.
 */

/** 
 * Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */ 
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



/**
 * Shim layer, polyfill, for cancelAnimationFrame with setTimeout fallback.
 */
window.cancelRequestAnimFrame = (function(){
  return  window.cancelRequestAnimationFrame || 
          window.webkitCancelRequestAnimationFrame || 
          window.mozCancelRequestAnimationFrame    || 
          window.oCancelRequestAnimationFrame      || 
          window.msCancelRequestAnimationFrame     || 
          window.clearTimeout;
})();

/**
 * Trace the keys pressed
 * http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
 */
window.Key = {
  pressed: {},
  LEFT:   37,
  RIGHT:  39,

  isDown: function(keyCode, keyCode1) {
    return this.pressed[keyCode] || this.pressed[keyCode1];
  },
  
  onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
    //console.log(event.keyCode);
  },
  
  onKeyup: function(event) {
    delete this.pressed[event.keyCode];
  }
};

window.addEventListener('keyup',   function(event) { Key.onKeyup(event); },   false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

/**
 * A Ball as an object.
 */
function Ball(radius, position, velocity, direction, img) {
	this.radius		= radius 	|| 10;
	this.position   	= position  	|| new Vector();
	this.velocity   	= velocity  	|| new Vector(5,0);
	this.direction  	= direction 	|| 0;
	this.acceleration 	= 0;
	this.img		= new Image();
	this.img.src		= "img/ball.png";
}

Ball.prototype.draw = function(ct) {
	ct.drawImage(this.img, this.position.x, this.position.y);
};

Ball.prototype.stayInArea = function(width, height) {
	if(this.position.x < 0) this.velocity.x = -this.velocity.x;
	if(this.position.x > width-this.radius) this.velocity.x = -this.velocity.x;
	if(this.position.y >= height-this.radius) {
		this.velocity.y = -this.velocity.y;
		startGame = false;
		playing = false;
	}
	if(this.position.y <= 0) this.velocity.y = -this.velocity.y;
};

Ball.prototype.update = function() {
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
};

/**
 * A Player as an object.
 */
function Player(width, height, position, velocity, direction, img) {
	this.height     	= height 	|| 10;
	this.width      	= width 	|| 40;
	this.position   	= position  	|| new Vector();
	this.velocity   	= velocity  	|| new Vector(50,0);
	this.direction  	= direction 	|| 0;
	this.acceleration 	= 0;
	this.img		= new Image();
	this.img.src		= "img/paddle.png";
}

Player.prototype.draw = function(ct) {
	ct.drawImage(this.img, this.position.x-this.width, this.position.y, this.width, this.height);
};

Player.prototype.moveLeft = function() {
  	this.position.x -= 1 * this.velocity.x;
  	//console.log('moveLeft');
};

Player.prototype.moveRight = function() {
  	this.position.x += 1 * this.velocity.x;
  	//console.log('moveRight');
};

Player.prototype.update = function() {
  	if (Key.isDown(Key.LEFT, Key.A))   this.moveLeft();
  	if (Key.isDown(Key.RIGHT, Key.D))  this.moveRight();
};

Player.prototype.stayInArea = function(width, height) {
	if(this.position.x < 0+this.width) this.position.x = 0+this.width;
	if(this.position.x > width) this.position.x = width;
};

/**
 * A Block as an object.
 */
function Block(width, height, position, img, life) {
	this.height     	= height 	|| 20;
	this.width      	= width 	|| 90;
	this.position   	= position  	|| new Vector();
	this.img		= new Image();
	this.img.src		= "img/dngn_mirrored_wall.png";
	this.life		= life		|| 2;
}

Block.prototype.draw = function(ct) {
	ct.drawImage(this.img, this.position.x-this.width, this.position.y, this.width, this.height);
};

function Button(width, height, position, img) {
	this.height     	= height 	|| 80;
	this.width      	= width 	|| 200;
	this.position   	= position  	|| new Vector();
	this.img		= new Image();
	this.img.src		= img;
}

Button.prototype.draw = function(ct) {
	ct.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
};

//Global variables and global functions

var listOfBlocks = [[]], stillAlive = 0, startGame = false, curr = 0, playing = false;

function createBlocks() {
	console.log('Draw block');
	var COL = 11, ROW = 6, drawOnX = 0, drawOnY = 0;
	for(var i=0; i < ROW; i++) {
		for(var j=0; j < COL; j++) {
			listOfBlocks[[i,j]] = new Block(90, 40, new Vector(drawOnX, drawOnY));
			drawOnX += 90;
		}
		drawOnY += 40;
		drawOnX = 0;
	}
}

function Vector(x, y) {
  	this.x = x || 0;
  	this.y = y || 0;
};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // return relative mouse position
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    };
}

/**
 * Breakout, the Game
 */
window.Asteroids = (function(){

	//Some vars...
  	var mouse = 0, mouseClick = 0, canvas, ct, paddle, lastGameTick, 
	audioList = ["2NRO8OT_-_01_-_Play_Intro.mp3", "2NRO8OT_-_05_-_The_TV-Asteroid.mp3", "2NRO8OT_-_06_-_Video_Connector_Outro.mp3", "2NRO8OT_-_01_-_Crash_Of_The_First_Interstellar_Channel.mp3", "2NRO8OT_-_02_-_Pair_Of_Minutes_Before_Reboot.mp3"];

	//Init function
	var init = function(canvas) {
		canvas = document.getElementById('canvas1');
		ct = $('#canvas1')[0].getContext("2d");
		width = 900,
		height = 600,
		ct.lineWidth = 1;
		if(playing === false) {
			player.src = 'msc/'+audioList[curr];
			player.play();
			curr++;
			if(curr === audioList.length) curr = 1;
			playing = true;
			console.log('msc/'+audioList[curr]);
		}
		ct.strokeStyle = 'hsla(0,0%,100%,1)',
		paddle = new Player(100, 20, new Vector(width/2, height-10), new Vector(10, 0), 0);
		ball = new Ball(10, new Vector(width/2, height-50), new Vector(0,-5), 0);
		button = new Button(200, 80, new Vector(width/2-100, height/2-160), 'img/paddle.png');
		createBlocks();
		console.log('Init the game');
	};

	//Collects mouse hovering coordinates
	canvas1.addEventListener('mousemove', function(evt) {
		mouse = getMousePos(canvas1, evt);
	}, false);

	//Collects mouse clicking coordinates
	canvas1.addEventListener('click', function(evt) {
		mouseClick = getMousePos(canvas1, evt);
	}, false);

	player.addEventListener('ended', function() {
		player.src = 'msc/'+audioList[curr];
		console.log('msc/'+audioList[curr]);
		cur++;
		if(curr === audioList.length) curr = 1;
		player.play();
	});

	//Updating cycle
	var update = function() {
		if(startGame === true) {
			// Move the paddles on mouse move
			if(mouse.x && mouse.y) {
				paddle.position.x = mouse.x+paddle.width/2;
			}
			paddle.update();
			ball.update();
			paddle.stayInArea(width, height);
			ball.stayInArea(width, height);
		}else {
			if(playing === false) {
				actionsound.src = 'msc/203331__veiler__explosion-documentary-veiler.wav';
				actionsound.play();
				curr++;
				if(curr === audioList.length) curr = 1;
				player.src = 'msc/2NRO8OT_-_Play_Intro.mp3';
				player.play();
				console.log('in the loop msc/'+audioList[curr]);
				playing = true;
			}

			if(mouseClick.x > button.position.x && mouseClick.x < button.position.x+button.width && mouseClick.y > button.position.y && mouseClick.y < button.position.y+button.height) {
				console.log(mouseClick.x+' '+mouseClick.y+' '+button.position.x+' '+button.position.y);
				console.log('BUtton!!!!');
				startGame = true;
				playing = false;
				init();
				actionsound.src = 'msc/136484__andreonate__ready-core.wav';
				actionsound.play();
			}
			mouseClick = 0;
		}
	};

	//Function used for rendering i.e drawing the stuff on the thing
	var render = function() {
		ct.clearRect(0,0,width,height);
		if(startGame === true) {
			ball.draw(ct);
			paddle.draw(ct);
			for(var i = 0; i < 6; i++) {
				for(var j = 1; j < 11; j++) {
					if(listOfBlocks[[i,j]].life > 0) {
						listOfBlocks[[i,j]].draw(ct);
					}
				}
			}
		} else {
			button.draw(ct);
		}
	};

	//Function that checks some collisions
	var collision = function() {
		//If the ball hits the paddle, it should get a different angle
		if(ball.position.y+ball.radius >= paddle.position.y && ball.position.x < paddle.position.x && ball.position.x > paddle.position.x-paddle.width) {
			ball.velocity.x = 8*((ball.position.x-((paddle.position.x-100)+50))/paddle.width);
			ball.velocity.y = -ball.velocity.y;
			actionsound.src = 'msc/219620__ani-music__massive-laser-blast-laser2.wav';
			actionsound.play();
		}
		//Check if ball kills blocks
		for(var i = 0; i < 6; i++) {
			for(var j = 1; j < 11; j++) {
				if(listOfBlocks[[i,j]].life > 0) {
					if(ball.position.x <= listOfBlocks[[i,j]].position.x && ball.position.x >= listOfBlocks[[i,j]].position.x-listOfBlocks[[i,j]].width && ball.position.y >= listOfBlocks[[i,j]].position.y && ball.position.y <= listOfBlocks[[i,j]].position.y+listOfBlocks[[i,j]].height) {
						ball.velocity.y = -ball.velocity.y;
						actionsound.src = 'msc/158141__qubodup__epic-logo-intro-part-1-impact-and-gas.wav';
						actionsound.play();
						listOfBlocks[[i,j]].life--;
						for(var i = 0; i < 6; i++) {
							for(var j = 1; j < 11; j++) {
								if(listOfBlocks[[i,j]].life > 0) {
									stillAlive++;
								}
							}
						}
						if(stillAlive === 50) {
							ball.velocity.y = ball.velocity.y*1.2;
						}
						if(stillAlive === 40) {
							ball.velocity.y = ball.velocity.y*1.2;
						}

						console.log(stillAlive+' block kvar');
						stillAlive = 0;
					}
				}
			}
		}
	};

	//Function to return FPS value for dev
	var fps = {
		startTime : 0,
		frameNumber : 0,
		getFPS : function(){
			this.frameNumber++;
			var d = new Date().getTime(),
				currentTime = ( d - this.startTime ) / 1000,
				result = Math.floor( ( this.frameNumber / currentTime ) );

			if( currentTime > 1 ){
				this.startTime = new Date().getTime();
				this.frameNumber = 0;
			}
			return result;

		}
	};

	var f = document.getElementById("fps");
	var gameLoop = function() {
		lastGameTick = Date.now();
		requestAnimFrame(gameLoop);
		collision();
		update();
		// only render if something was updated.
		render();
		f.innerHTML = fps.getFPS();
	};

	return {
		'init': init,
		'gameLoop': gameLoop
	}
})();



// On ready
$(function(){
	'use strict';

	Asteroids.init('canvas1');
	Asteroids.gameLoop();

	console.log('Ready to play.');  
});
