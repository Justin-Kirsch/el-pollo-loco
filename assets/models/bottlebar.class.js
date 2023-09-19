class BottleBar extends StatusBar{
    IMAGES_BOTTLE = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.positionX = 30;
        this.positionY = 110;
        this.height = 60;
        this.width = 200;
        this.setPercentage(this.IMAGES_BOTTLE, 0);
    }
}