class SmallChicken extends MoveableObject {
    height = 60;
    width = 60;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'

    ];
    
    currentImage = 0;


    constructor(positionX) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.positionX = positionX + Math.random() * 100;
        this.positionY = 370;
        this.animate();
        this.speed = 0.8 + Math.random() * 0.4;
    };

    animate() {
        setInterval( () => {
            if(gameStarted && !gameEnded) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 10);

        setInterval( () => {
            if(gameStarted && !gameEnded) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval( () => {
            if (this.isDead()) {
                this.loadImage('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            }
        })
    };
} 