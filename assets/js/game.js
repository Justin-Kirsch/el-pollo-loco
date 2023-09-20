let canvas;
let world;
let keybindings = new Keybindings();
let gameStarted = false;
let gamePaused = false;
let gameEnded = false;
let endScreenContainer = document.getElementById('endScreenContainer');

function init() {
    canvas = document.getElementById('canvas');
    loadGame(canvas);
    world = new World(canvas, keybindings);

    console.log('My Character is,', world.character)
    endScreenContainer.style.display = 'none';
    gameStarted = true;
}

function loadGame(canvas) {
    let startScreen = document.getElementById('startScreenContainer');

    startScreen.style.display = 'none';
    canvas.style.display = 'block';
}

function endGame() {
    if(gameEnded) {
        endScreenContainer.style.display = 'flex';
    }
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == '32' && gameStarted && !gamePaused && !gameEnded) {
        // KEY_D
        keybindings.SPACE = true;
        world.character.jump();
    }
    else if (event.keyCode == '38' && gameStarted && !gamePaused && !gameEnded) {
        keybindings.UP = true;
    }
    else if (event.keyCode == '37' && gameStarted && !gamePaused && !gameEnded) {
        keybindings.LEFT = true;
    }
    else if (event.keyCode == '39' && gameStarted && !gamePaused && !gameEnded) {
        keybindings.RIGHT = true;
    }
    else if (event.keyCode == '68' && gameStarted && !gamePaused && !gameEnded) {
        keybindings.D = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode == '32' && gameStarted && !gamePaused && !gameEnded) {
        // KEY_D
        keybindings.SPACE = false;
    }
    else if (event.keyCode == '38' && gameStarted && !gamePaused && !gameEnded) {
        keybindings.UP = false;
    }
    else if (event.keyCode == '37' && gameStarted && !gamePaused && !gameEnded) {
        keybindings.LEFT = false;
    }
    else if (event.keyCode == '39' && gameStarted && !gamePaused && !gameEnded) {
        keybindings.RIGHT = false;
    }
    else if (event.keyCode == '68' && gameStarted && !gamePaused && !gameEnded) {
        keybindings.D = false;
    }
})
