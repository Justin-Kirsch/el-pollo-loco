class DrawableObject {
    positionX;
    positionY;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    draw(ctx) {
        ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    drawEntityFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.positionX,this.positionY, this.width, this.height);
            ctx.stroke();
        }
    }
    drawObjectFrame(ctx) {
        if(this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.positionX,this.positionY, this.width, this.height);
            ctx.stroke();
        }
    }
}

