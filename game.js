var canvas = document.getElementById('game');

var ctx = canvas.getContext && canvas.getContext('2d');
	if (!ctx) {
		// No 2d context available, let the user know
		alert('Please update your browser');
	} else {
		startGame();
	}
	function startGame() {
		
	}