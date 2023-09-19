class Character extends MoveableObject {
    height = 200;
    width = 100;
    positionX = 120;
    positionY = 230;
    offsetTop = 120;
    offsetBottom = 40;
    offsetLeft = 15;
    offsetRight = 15;
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DYING = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    
    world;
    speed = 3;
    walking_sound = new Audio('./assets/audio/walking.mp3');
    immortalFor = 1.3;
    
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {

        let walkRightInterval = setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keybindings.RIGHT && this.positionX < this.world.level.level_end_positionX){
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
        }, 1000 / 60);

        setInterval(() => {
            if(this.world.keybindings.LEFT && this.positionX > 0){
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            };
            this.world.camera_positionX = -this.positionX +100;
        }, 1000 / 60);

        setInterval(() => {
            if(this.world.keybindings.SPACE && !this.isAirborne()) {
                this.jump();
            };
        }, 1000 / 60);

        let characterAnimationInterval = setInterval( () => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
                clearInterval(characterAnimationInterval);
            } else if (this.isHurt(this.immortalFor)) {
                 this.playAnimation(this.IMAGES_HURT);
            }
            else if(this.isAirborne()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if(this.world.keybindings.RIGHT || this.world.keybindings.LEFT){
                this.playAnimation(this.IMAGES_WALKING);
            }}}, 1000 / 15);
    };

    checkInventoryForBottles() {
        if(this.world.bottlesAmount > 0) {
            return true;
        }
    }

    leftHitboxHitsEnemy (moveableObject){
        return this.positionX > moveableObject.positionX + moveableObject.width;
    }
    rightHitBoxHitsEnemy (moveableObject) {
        return this.positionX + this.width < moveableObject.positionX;
    }
    topHitBoxHitsEnemy (moveableObject) {
        return this.positionY + this.offsetTop < moveableObject.positionY + moveableObject.height;
    }
    bottomHitBoxHitsEnemy (moveableObject) {
        return this.positionY + this.height > moveableObject.positionY;
    }
}