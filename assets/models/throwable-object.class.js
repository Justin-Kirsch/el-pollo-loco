class ThrowableObject extends MoveableObject{
IMAGES_ROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

IMAGES_SPLASH = [
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
];
bottleDropRight;
bottleDropLeft;


    constructor(positionX, positionY, characterDirection) {
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.positionX = positionX;
        this.positionY = positionY;
        this.otherDirection = characterDirection;
        this.height = 75;
        this.width = 60;
        this.animate();
        this.throwToDirection();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 1000 / 60)

        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_SPLASH);
                setTimeout(() => {
                    clearInterval(this.gravityInterval);
                    clearInterval(this.bottleDropRight);
                    clearInterval(this.bottleDropLeft);
                }, 1000 / 60);
            }
        })
    }

    throwToDirection() {
        if (this.otherDirection) {
            this.throwLeft();
        } else if (!this.otherDirection) {
            this.throwRight();
        }
    }

    throwRight() {
        this.speedY = 30;
        this.applyGravity();
        this.bottleDropRight = setInterval(() => {
            this.positionX += 5;
        }, 1000 / 60)
    }

    throwLeft() {
        this.speedY = 30;
        this.applyGravity();
        this.bottleDropLeft = setInterval(() => {
            this.positionX -= 5;
        }, 1000 / 60)
    }

}