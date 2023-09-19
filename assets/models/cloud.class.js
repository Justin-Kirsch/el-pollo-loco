class Cloud extends MoveableObject{
    height = 250;
    width = 400;
    speed = 0.2;

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');

        this.positionX = 0 + Math.random() * 500;
        this.positionY = 20;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


}