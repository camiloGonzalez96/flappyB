class Escena extends Phaser.Scene {
    preload(){

    }
    create(){

    }
}

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: Escena,
    scale: {
        mode: Phaser.Scale.FIT    //AQUI PODEMOS MEJORAR EL CÓDIGO PARA QUE SE ADAPTE MELO
    }
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 300,
            }
        }
    }
}

new Phaser.Game(config);