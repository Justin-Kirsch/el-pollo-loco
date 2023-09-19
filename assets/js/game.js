let canvas;
let world;
let keybindings = new Keybindings();


function init() {
    canvas = document.getElementById('canvas');
    loadGame(canvas);
    world = new World(canvas, keybindings);

    console.log('My Character is,', world.character)
}

function loadGame(canvas) {
    let startScreen = document.getElementById('startScreenContainer');

    startScreen.style.display = 'none';
    canvas.style.display = 'block';
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == '32') {
        // KEY_D
        keybindings.SPACE = true;
        world.character.jump();
    }
    else if (event.keyCode == '38') {
        keybindings.UP = true;
    }
    else if (event.keyCode == '37') {
        keybindings.LEFT = true;
    }
    else if (event.keyCode == '39') {
        keybindings.RIGHT = true;
    }
    else if (event.keyCode == '68') {
        keybindings.D = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode == '32') {
        // KEY_D
        keybindings.SPACE = false;
    }
    else if (event.keyCode == '38') {
        keybindings.UP = false;
    }
    else if (event.keyCode == '37') {
        keybindings.LEFT = false;
    }
    else if (event.keyCode == '39') {
        keybindings.RIGHT = false;
    }
    else if (event.keyCode == '68') {
        keybindings.D = false;
    }
})
