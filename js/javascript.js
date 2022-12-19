class Escena extends Phaser.Scene {
  constructor(){
    super('inicio');
  }

    preload() {
      //definimos el fondo
      this.load.image('fondo', '../imagenes/fondo.png');
      //definimos el pajaro
      this.load.spritesheet('pajaro', '../imagenes/pajaro.png', {frameWidth: 64, frameHeight: 50});
      //definimos los obstaculos
      this.load.image('muro', '../imagenes/muroMedio.png');
      this.load.image('muroArriba', '../imagenes/muroArriba.png');
      this.load.image('muroAbajo', '../imagenes/muroAbajo.png');
      
        
    }

    create() {
      //invocamos el fondo
      this.add.sprite(480,320,'fondo');
      //invocamos al pajaro
      this.player = this.physics.add.sprite(64, 100, 'pajaro');
      //aplicamos la animación de volar
      this.anims.create({
        key: 'volar',
        frames: this.anims.generateFrameNumbers('pajaro', {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1,
      });
      
      //animación de salto
      this.anims.create({
        key: 'saltar',
        frames: this.anims.generateFrameNumbers('pajaro', {start: 2, end: 2}),
        frameRate: 7,
        repeat: 1,
      });
      this.player.play('volar');
      
      //implementación de elevación
      this.input.keyboard.on('keydown', (event) => {
        if (event.keyCode === 32) {
          this.saltar();
        }
      });
      this.input.on('pointerdown', () => this.saltar());
      this.player.on('animationcomplete', this.animationComplete, this);

      this.nuevaColumna();
    }

    //implementación de obstaculos
    nuevaColumna() {
      const columna = this.physics.add.group();
      const hueco = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < 8; i++) {
        if (i !== hueco && i !== hueco + 1 && i !== hueco - 1) {

          let cubo;
          if (i == hueco - 2) {
            cubo = columna.create(960, i * 100, 'muroArriba');
          } else if (i == hueco + 2) {
            cubo = columna.create(960, i * 100, 'muroAbajo');
          } else {
            cubo = columna.create(960, i * 100, 'muro');
          }

          cubo.body.allowGravity = false;
        }
      }
      columna.setVelocityX(-200);
      columna.checkWorldBounds = true;
      columna.outOfBoundsKill = true;
      this.time.delayedCall(1000, this.nuevaColumna, [], this);
      //colisión con muros
      this.physics.add.overlap(this.player, columna, this.hitColumna, null, this);
    }

    //aviso de colisión
    hitColumna() {
      this.scene.start('escenaFin');
    }

    //analizar animación y seguir volando
    animationComplete(animation, frame, sprite) {
      if (animation.key === 'saltar') {
        this.player.play('volar');
      }
    }
    
    //función que ejecuta el salto y su animación
    saltar() {
      this.player.setVelocityY(-200);
      this.player.play('saltar');
    }

    
}

//definimos otra nueva escena para cuando el jugador pierde
class EscenaFin extends Phaser.Scene {
  constructor(){
    super('escenaFin');
  }

  preload(){
    this.load.image('fondoFin','../imagenes/finJuego.png')
  }

  create(){
    this.add.sprite(480,320, 'fondoFin');

    this.input.on('pointerdown', () => this.volverAJugar())
  }

  volverAJugar(){
    this.scene.start('inicio');
  }
}



const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [Escena,EscenaFin],
    scale: {
		mode: Phaser.Scale.FIT
    },
    physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: {
				y: 300,
			},
		},
	},
};

new Phaser.Game(config);

