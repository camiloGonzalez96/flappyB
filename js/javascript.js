class Escena extends Phaser.Scene {

    preload() {
      this.load.image('fondo', '../imagenes/fondo.png');
        
    }

    create() {
      this.add.sprite(480,320,'fondo');

    }
}


const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: Escena,
    scale: {
		mode: Phaser.Scale.FIT
    },
    /*physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: {
				y: 300,
			},
		},
	},*/
};

new Phaser.Game(config);

