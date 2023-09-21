class Chicken extends MoveableObject {
    height = 80;
    width = 70;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

    ];
    
    currentImage = 0;


    constructor(positionX) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.positionX = positionX + Math.random() * 100;
        this.positionY = 350;
        this.animate();
        this.speed = 0.5 + Math.random() * 0.35;
    };

    animate() {
        let chickenWalkingAnimation = setInterval( () => {
            if(gameStarted && !gameEnded) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 10);

        let chickenMoveLeftInterval = setInterval( () => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval( () => {
            if (this.isDead()) {
                this.loadImage('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                clearInterval(chickenMoveLeftInterval);
                clearInterval(chickenWalkingAnimation);
            }
        })
    };
} 