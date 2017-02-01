var sprites = {
	ship: {sx: 0, sy: 0, w: 50, h: 85, frames: 3}
};
var startGame = function() {
	SpriteSheet.draw(Game.ctx, "ship", 100, 100, 1);
}
window.addEventListener("load" ,function() {
	Game.initialize("game", sprites, startGame);
});
