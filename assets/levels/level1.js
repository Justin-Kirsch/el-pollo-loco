let level1;
level1 = new Level(
    [
        new Chicken(500),
        new Chicken(800),
        new Chicken(1200),
        new Chicken(1400),
        new Chicken(1900),
        new Chicken(2000),
        new Chicken(2080),
    ],
    [
        new SmallChicken(460),
        new SmallChicken(820),
        new SmallChicken(1150),
        new SmallChicken(1350),
        new SmallChicken(1850),
        new SmallChicken(2050),
        new SmallChicken(2150),
        new SmallChicken(2210),
    ],
    [
        new Endboss()
    ],

    [
        new Cloud(),
    ], 
    [
        new BackgroundObject('assets/img/5_background/layers/air.png', -720),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -720),
        new BackgroundObject('assets/img/5_background/layers/air.png', -1),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', -1),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', -1),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', -1),
        new BackgroundObject('assets/img/5_background/layers/air.png', 718),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 718),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 718),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 718),
        new BackgroundObject('assets/img/5_background/layers/air.png', 1437),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 1437),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 1437),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 1437),
        new BackgroundObject('assets/img/5_background/layers/air.png', 2154),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 2154),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 2154),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 2154),
        new BackgroundObject('assets/img/5_background/layers/air.png', 2871),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 2871),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 2871),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 2871),
    ],
    [
        new Bottle(400, 350, 1),
        new Bottle(600, 350, 2),
        new Bottle(800, 350, 1),
        new Bottle(1000, 350, 2),
        new Bottle(1200, 350, 1),
        new Bottle(1400, 350, 2),
        new Bottle(1600, 350, 1),
        new Bottle(1800, 350, 2)
    ],
    [
        new Coin(400, 230, 1),
        new Coin(440, 190, 1),
        new Coin(480, 150, 2),

        new Coin(820, 190, 1),
        new Coin(860, 230, 1),
        new Coin(900, 190, 1),

        new Coin(1140, 190, 1),
        new Coin(1180, 150, 2),
        new Coin(1220, 190, 1),
        new Coin(1260, 230, 1),
    ]
);