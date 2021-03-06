// the SpriteSheet class
var SpriteSheet = new function() {
	this.map = {};
	this.load = function(spriteData, callback) {
		this.map = spriteData;
		this.image = new Image();
		this.image.onload = callback;
		this.image.src = 'images/sprites.png';
	};
	this.draw = function(ctx, sprite, x, y, frame) {
		var s = this.map[sprite];
		if (!frame) {
			frame = 0;
		}
		ctx.drawImage(this.image,
						s.sx + frame * s.w,
						s.sy,
						s.w, s.h,
						x, y,
						s.w, s.h);
	};
}

function startGame() {
	SpriteSheet.load({
		ship: {sx: 0, sy: 0, w: 50, h: 85, frames: 3}
	}, function() {
		SpriteSheet.draw(ctx, "ship", 0, 0);
		SpriteSheet.draw(ctx, "ship", 100, 50);
		SpriteSheet.draw(ctx, "ship", 150, 100, 1);
	});
}

// Implementing the Game Object
// the Game class
var Game = new function() {
	// Game Initialization
	this.initialize = function(canvasElementId, sprite_data, callback) {

		this.canvas = document.getElementById(canvasElementId);
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		// Set up the rendering context
		this.ctx = this.canvas.getContext && this.canvas.getContext("2d");

		if (!this.ctx) { return alert("Please upgrade your brouser to play"); }

		// Set up input
		this.setupInput();

		// Start the game loop
		this.loop();

		// Load the sprite sheet and pass forward the callback.
		SpriteSheet.load(sprite_data, callback);
	};

	// Handle Input
	var KEY_CODES = { 37: 'left', 39: 'right', 32: 'fire' };
	this.keys = {};
	this.setupInput = function() {

		window.addEventListener('keydown', function(e) {
			if (KEY_CODES[event.keyCode]) {
				Game.keys[KEY_CODES[event.keyCode]] = true;
				e.preventDefault();
			}
		}, false);

		window.addEventListener('keyup', function(e) {
			if (KEY_CODES[event.keyCode]) {
				Game.keys[KEY_CODES[event.keyCode]] = false;
				e.preventDefault();
			}
		}, false);
	}

	// Game Loop
	var boards =[];
	this.loop = function() {
		var dt = 30 / 1000;
		for (var i = 0, len = boards.length; i < len; i++) {
			if (boards[i]) {
				boards[i].step(dt);
				boards[i] && boards[i].draw(Game.ctx);
			}
		}
		setTimeout(Game.loop, 30);
	};

	// Change an active game board
	this.setBoard = function(num, board) {
		boards[num] = board;
	};
};

// The TitleScreen class
var TitleScreen = function TitleScreen(title, subtitle, callback) {
	this.step = function(dt) {
		if (Game.keys['fire'] && callback) callback();
	};

	this.draw = function(ctx) {
		ctx.fillStyle = "#FFF";
		ctx.textAlign = "center";

		// title
		ctx.font = "bold 40px bangers";
		ctx.fillText(title, Game.width/2, Game.height/2);

		// subtitle
		ctx.font = "bold 20px bangers";
		ctx.fillText(subtitle, Game.width/2, Game.height/2 + 40);
	};
}

