export default class Player extends Phaser.Physics.Arcade.Image {
    static PLAYER_SPEED = 5;

    constructor(scene) {
        super(scene, 400, 300, "cat");
        this.scale = 0.4;
        this.alpha = 1;
      
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    hitByEnemy(damage) {

    }

    shootBeam() {

    }
}