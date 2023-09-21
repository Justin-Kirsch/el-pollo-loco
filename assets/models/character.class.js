class Character extends MoveableObject {
    height = 200;
    width = 100;
    positionX = 120;
    positionY = 230;
    offsetTop = 120;
    offsetBottom = 40;
    offsetLeft = 15;
    offsetRight = 15;
    characterStartIdleAt = 3;
    characterStartLongIdleAt = 6;
    world;
    speed = 3;
    walking_sound = new Audio('./assets/audio/walking.mp3');
    immortalFor = 1.3;

    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

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
    
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
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
            } else if (!this.isDead() && this.isHurt() && !this.isAirborne()) {
                 this.playAnimation(this.IMAGES_HURT);
            } else if(this.isAirborne() && this.positionY < 230) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if(this.world.keybindings.RIGHT || this.world.keybindings.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImage(this.IMAGES_IDLE[0]);
            }}, 1000 / 15);
    };

    checkInventoryForBottles() {
        if(this.world.bottlesAmount > 0) {
            return true;
        }
    }

    playCharacterIdleAnimation() {
        if(this.checkCharacterIdleStatus(this.characterStartLongIdleAt)) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            console.log('check Long Idle')
        } else if(this.checkCharacterIdleStatus(this.characterStartIdleAt)) {
            console.log('check normal idle')
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
}