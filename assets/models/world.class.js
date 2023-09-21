class World {
    level = level1;
    character = new Character();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossHealthBar = new EndbossHealthBar();
    canvas;
    ctx;
    keybindings;
    camera_positionX = 0;
    throwableObjects = [];
    coinAmount = 0;
    bottlesAmount = 0;
    throwCooldown = 0;

    constructor(canvas, keybindings) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keybindings = keybindings;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkIfEndbossIsAlerted();
            this.checkIfGameEnded();
            this.character.lastKeyPressTimer();
        }, 35)
        setInterval(() => {
            this.character.playCharacterIdleAnimation();
        }, 50);
        setInterval(() => {
            this.checkThrowObject();
        }, 250)
    };

    checkCollisions() {
        this.checkCollisionWithChickens(this.level.chickens);
        this.checkCollisionWithChickens(this.level.smallChickens);
        this.checkCollisionWithChickens(this.level.endboss);
        this.characterJumpsOnEnemy(this.level.chickens);
        this.characterJumpsOnEnemy(this.level.smallChickens);
        this.checkCollisionWithBottle();
        this.checkCollisionWithCoin()
        this.checkBottleCollideWithChicken();
    }

    checkCollisionWithChickens(entityArray) {
        entityArray.forEach((entity) => {
            if(this.character.isColliding(entity) && !this.character.isHurt() && !this.character.isAirborne()) {
                this.character.hit();
                this.healthBar.setPercentage(this.healthBar.IMAGES_HEALTH, this.character.health);
            }
        })
    }

    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if(this.character.isColliding(bottle) && this.bottlesAmount < 100) {
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottlesAmount += 20;
                this.bottleBar.setPercentage(this.bottleBar.IMAGES_BOTTLE, this.bottlesAmount);
            }
        })
    }

    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin) && this.coinAmount < 100) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinAmount += 20;
                this.coinBar.setPercentage(this.coinBar.IMAGES_COIN, this.coinAmount);
                this.checkBottleAmount();
            }
        })
    }

    checkBottleAmount() {
        if(this.coinAmount === 100) {
            this.resetCoinAmount();
            this.healCharacter();
        }
    }

    resetCoinAmount() {
        this.coinAmount = 0;
        this.coinBar.setPercentage(this.coinBar.IMAGES_COIN, this.coinAmount);
    }

    healCharacter() {
        this.character.health = 100;
        this.healthBar.setPercentage(this.healthBar.IMAGES_HEALTH, this.character.health);
    }



    characterJumpsOnEnemy(entityArray) {
        entityArray.forEach((entity) => {
            if (this.checkIfCharacterJumpsOnEnemy(entity) && entity.health != 0) {
                entity.health -= 100;
                setTimeout(() => {
                    entityArray.splice(entityArray.indexOf(entity), 1);
                }, 35);
            }
        });
    }

    checkIfCharacterJumpsOnEnemy(entity) {
        return  this.character.isFallingDown() &&
                this.character.isColliding(entity);
    }

    checkBottleCollideWithChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.chickens.forEach((chicken) => {
                this.killChickenAndBottle(this.level.chickens, chicken, bottle, 100);
            })
            this.level.smallChickens.forEach((smallChicken) => {
                this.killChickenAndBottle(this.level.smallChickens, smallChicken, bottle, 100);
            })
            this.level.endboss.forEach((endboss) => {
                this.killChickenAndBottle(this.level.endboss, endboss, bottle, 20);
            })
        })
    }

    checkEndbossHealthBarInterval = setInterval(() => {
        if(this.level.endboss.length > 0) {
            const endbossHealthBar = this.endbossHealthBar;
            const endbossHealth = this.level.endboss[0].health;
            endbossHealthBar.setPercentage(this.endbossHealthBar.IMAGES_HEALTH, endbossHealth);
        }
    })

    clearEndbossHealthInterval() {
        if(this.level.endboss[0].health <= 0) {
            this.checkEndbossHealthBarInterval();
        }
    }

    checkIfEndbossIsAlerted() {
            if(this.character.positionX >= 2340 && this.level.endboss.length > 0) {
                this.level.endboss[0].isAlerted = true;
            }
    }

    killChickenAndBottle(entityArray, entity, bottle, damage) {
        if(bottle.isColliding(entity)) {
            entity.health -= damage;
            bottle.health = 0;
            setTimeout(() => {
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
            }, 25);
            setTimeout(() => {
                if(entity.health <= 0 && entityArray !== this.level.endboss) {
                    entityArray.splice(entityArray.indexOf(entity), 1);
                } else if (entity.health <= 0 && entityArray === this.level.endboss){
                    clearInterval(this.level.endboss.endbossMoveLeft);
                    setTimeout(() => {
                        entityArray.splice(entityArray.indexOf(entity), 1);
                    }, 250);
                }
            }, 150);
        }
    }

    checkThrowObject() {
        const inventoryHasBottles = this.character.checkInventoryForBottles();
        if (this.throwCooldown <= 0) {
            if (this.keybindings.D && inventoryHasBottles && this.character.otherDirection) {
                this.createThrowableObject();
                this.bottleBar.setPercentage(this.bottleBar.IMAGES_BOTTLE, this.bottlesAmount);
            } else if (this.keybindings.D && inventoryHasBottles && !this.character.otherDirection) {
                this.createThrowableObject();
                this.bottleBar.setPercentage(this.bottleBar.IMAGES_BOTTLE, this.bottlesAmount);
            }
        } else {
            this.throwCooldown -= 200;
        }
    }

    createThrowableObject() {
        if(!this.character.otherDirection) {
            this.throwableObjects.push(
                new ThrowableObject(this.character.positionX + 40, this.character.positionY + 40, this.character.otherDirection)
            );
        } else {
            this.throwableObjects.push(
                new ThrowableObject(this.character.positionX - 20, this.character.positionY + 40, this.character.otherDirection)
            );
        }
        this.bottlesAmount -= 20;
        this.throwCooldown = 200;
    }
    renderEndbossHealthBar() {
        if(this.level.endboss.length > 0) {
            if(this.level.endboss[0].isInAttackMode) {
                this.addToMap(this.endbossHealthBar);
            }
        }
    }

    checkIfGameEnded() {
        if(this.character.isDead() || this.level.endboss.length == 0) {
            gameEnded = true;
            endGame();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_positionX, 0)

        this.addObjectToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        // -------- Space for fixed Objects --------
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.chickens);
        this.addObjectToMap(this.level.smallChickens);
        this.addToMap(this.level.endboss[0]);
        this.addObjectToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_positionX, 0)

        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.renderEndbossHealthBar();

        // Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addObjectToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(moveableObject) {
        if (typeof moveableObject !== 'undefined') {
            if (moveableObject.otherDirection && !moveableObject.isDead()) {
                this.flipImage(moveableObject)
            }
            moveableObject.draw(this.ctx);
            moveableObject.drawObjectFrame(this.ctx);
            moveableObject.drawEntityFrame(this.ctx);
    
    
            if (moveableObject.otherDirection && !moveableObject.isDead()) {
                this.flipImageBack(moveableObject)
            }
        }
    }

    flipImage(moveableObject) {
        this.ctx.save();
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1);
        moveableObject.positionX = moveableObject.positionX * -1;
    }

    flipImageBack(moveableObject) {
        moveableObject.positionX = moveableObject.positionX *-1;
        this.ctx.restore();
    }
}