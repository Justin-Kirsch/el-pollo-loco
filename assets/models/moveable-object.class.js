class MoveableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = -45;
    acceleration = 5;
    health = 100;
    lastHit = 0;
    lastThrow = 0;
    lastUsedKeyTime;
    immortalFor = 0;
    gravityInterval;
    offsetTop = 0;
    offsetBottom = 0;
    offsetLeft = 0;
    offsetRight = 0;

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if(this.isAirborne() || this.speedY > 0) {
                this.positionY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    };

    isAirborne() {
        if (this instanceof ThrowableObject) { // Throwable Objects should always fall
            return true;
        } else {
        return this.positionY < 230;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    moveRight() {
        if(gameStarted && !gameEnded) {
        this.positionX += this.speed;
        }
    };

    moveLeft() {
        if(gameStarted && !gameEnded) {
        this.positionX -= this.speed;
        }
    };

    jump() {
        if(this.positionY == 230) {
            return this.speedY = 40;
        }
    };

    isColliding(moveableObject) {
        if(this.offsetTop > 0) {
            return this.positionX + (this.width - this.offsetRight) > moveableObject.positionX &&
            this.positionY + this.height > moveableObject.positionY &&
            this.positionX + this.offsetLeft< moveableObject.positionX + moveableObject.width &&
            this.positionY + this.offsetTop < moveableObject.positionY + moveableObject.height;
        } else {
            return this.positionX + (this.width - this.offsetLeft) > moveableObject.positionX &&
            this.positionY + this.height > moveableObject.positionY &&
            this.positionX + this.offsetLeft < moveableObject.positionX + moveableObject.width &&
            this.positionY < moveableObject.positionY + moveableObject.height;
        }
    };

    charBottomCollidesWithChicken(moveableObject) {
       return this.positionX + this.width > moveableObject.positionX &&
                this.positionY + this.height - this.offsetBottom> moveableObject.positionY &&
                this.positionX < moveableObject.positionX + moveableObject.width;
    };
 

    hit(){
        if(!this.isHurt() && 
        !this.isFallingDown() && 
        !this.isDead()) {
            this.health -= 20;

            if(this.health < 0) {
                this.health = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
        this.isOnGround();
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isFallingDown() {
        return this.speedY < 0;
    }

    isOnGround () {
        if (this.positionY === 230) {
            this.speedY = 0;
        }
    }


    isDead() {
        return this.health == 0;
    };

    throwBottleCooldown(throwDelay) {
        const currentTime = new Date().getTime();
        const timePassed = (currentTime - this.lastThrow) / 1000; // Differenz in Sekunden
        return timePassed < throwDelay;
    }

    checkLastPressedKey() {
        return this.world.keybindings.D ||
                this.world.keybindings.SPACE ||
                this.world.keybindings.LEFT ||
                this.world.keybindings.RIGHT
    }

    lastKeyPressTimer() {
        if (this.checkLastPressedKey()) {
          this.lastUsedKeyTime = new Date().getTime() / 1000;
        }
    }

    checkCharacterIdleStatus(idleTime) {
        const currentTimeInSeconds = new Date().getTime() / 1000;
        const currentIdleTime = currentTimeInSeconds - this.lastUsedKeyTime;
        return currentIdleTime >= idleTime;
    }

    characterIsIdle() {
        return gameStarted &&
                !gameEnded &&
                !this.isAirborne() &&
                !this.isDead() &&
                this.playerIsAFK() &&
                this.lastUsedKeyTime >= this.characterStartIdleAt &&
                this.lastUsedKeyTime < this.characterStartLongIdleAt
    }

    characterIsLongIdle() {
        return gameStarted &&
                !gameEnded &&
                !this.isAirborne() &&
                !this.isDead() &&
                this.playerIsAFK() &&
                this.lastUsedKeyTime > this.characterStartLongIdleAt
    }

    playerIsAFK() {
        return !this.world.keybindings.RIGHT && 
                !this.world.keybindings.LEFT &&
                !this.world.keybindings.D &&
                !this.world.keybindings.SPACE
    }

    isIdle() {
        return this.checkCharacterIdleStatus(this.characterStartIdleAt);
    }

    isLongIdle() {
        return this.checkCharacterIdleStatus(this.characterStartLongIdleAt);
    }
}