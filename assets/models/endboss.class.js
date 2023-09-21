class Endboss extends MoveableObject {
    height = 260;
    width = 250;
    positionX = 2700;
    positionY = 175;
    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    ];
    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    currentImage = 0;
    immortalFor = 1;
    isAlerted = false;
    isInAttackMode = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.8;
        this.animate();
    }

    animate() {
        let endbossWalkingInterval = setInterval( () => {
            if (gameStarted && !gameEnded && this.isInAttackMode) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 10);

        let endbossAlertAnimationInterval = setInterval(() => {
            if(gameStarted && !gameEnded && this.isAlerted) {
                this.playAnimation(this.IMAGES_ALERT);
                setTimeout(() => {
                    clearInterval(endbossAlertAnimationInterval);
                    this.isInAttackMode = true;
                }, 350);
            }
        }, 150);

        setInterval(() => {
            if (this.positionX <= 0) {
                this.otherDirection = true;
            } else if (this.positionX >= 2700) {
                this.otherDirection = false;
            }
        }, 1000 / 59);

        let endbossMove = setInterval( () => {
            if (this.otherDirection && this.isInAttackMode) {
                this.moveRight();
            } else if (!this.otherDirection && this.isInAttackMode){
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval( () => {
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0]);
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 1000 / 5);
    };
}