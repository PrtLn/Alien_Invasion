var canvas = document.getElementById('game');

var ctx = canvas.getContext && canvas.getContext('2d');
	if (!ctx) {
		// No 2d context available, let the user know
		alert('Please update your browser');
	} else {
		startGame();
	}
	function startGame() {
		ctx.fillStyle = "#ffff00";
		ctx.fillRect(50, 100, 380, 400);

		// Second, semi-transparent blue rectangle
		ctx.fillStyle = "rgba(0, 0, 128, 0.6)";
		ctx.fillRect(0, 50, 380, 400);

		var img = new Image();
		img.onload = function() {
			// ctx.drawImage(img, 100, 100);
			// ctx.drawImage(img, 100, 100, 250, 135);
			ctx.drawImage(img, 50, 0, 50, 80, 50, 100, 50, 80);
		}
		img.src = 'images/sprites.png';
	}