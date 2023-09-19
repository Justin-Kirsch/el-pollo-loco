class Coin extends DrawableObject {
    height = 50;
    width = 50;

    constructor(positionX, positionY, imageNumber) {
        super();
        this.positionX = positionX;
        this.positionY = positionY;
        this.loadImage(`assets/img/8_coin/coin_${imageNumber}.png`);
    }
}