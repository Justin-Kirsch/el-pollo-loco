class HealthBar extends StatusBar {
    IMAGES_HEALTH = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.positionX = 30;
        this.positionY = 10;
        this.height = 60;
        this.width = 200;
        this.setPercentage(this.IMAGES_HEALTH, 100);
    }
}