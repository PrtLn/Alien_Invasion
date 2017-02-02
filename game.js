var sprites = {
	ship: {sx: 0, sy: 0, w: 50, h: 85, frames: 3}
};
var startGame = function() {
	SpriteSheet.draw(Game.ctx, "ship", 100, 100, 1);
}
window.addEventListener("load" ,function() {
	Game.initialize("game", sprites, startGame);
});

// the Starfield class
var Starfield = function(speed, opacity, numStars, clear) {

// Set up the offscreen canvas
	var stars = document.createElement("canvas");
	stars.width = Game.width;
	stars.height = Game.height;

	var startx = stars.getContext("2d");
	var offset = 0;

	// If the clear option is set, make the background black instead of transparent
	if (clear) {
		starCtx.fillStyle = "#000";
		starCtx.fillRect(0, 0, stars.width, stars.height);
	}

	// Drawing stars (draw a brunch of random 2 pixel rectangles onto the offscreen canvas)
	starCtx.fillStyle = "#FFF";
	starCtx.globalAlpha = opacity;
	for (var i = 0, i < numStars; i++) {
		starCtx.fillRect(Math.floor(Math.random() * stars.width),
						 Math.floor(Math.random() * stars.height),
						 2,
						 2);	
	}

	// Draw method that called every frame to draw the starfield onto the canvas
	this.draw = function(ctx) {
		var intOffset = Math.floor(offset);
		var remaining = stars.height - intOffset;
		// Draw the top half of the starfield
		if (intOffset > 0) {
			ctx.drawImage(stars,
						0, remaining,
						stars.width, intOffset,
						0, 0,
						stars.width, intOffset);
		}
		// Draw the bottom half of the starfield
		if (remaining > 0) {
			ctx.drawImage(stars,
						0, 0,
						stars.width, remaining,
						0, intOffset,
						stars.width, remaining);
		}
	}

	// The method is called to update the starfield
	this.step = function(dt) {
		offset += dt * speed;
		offset = offset % stars.height;
	}
}