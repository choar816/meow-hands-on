import Phaser from 'phaser';

export default class Beam extends Phaser.Physics.Arcade.Image {
    static SPEED = 100;
    static DURATION = 1000;

    constructor(scene, player) {
        const x = player.x;
        const y = player.y - 16;
        super(scene, x, y, "beam");
        this.scale = 0.2;

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCircle(30);
        this.setVelocityY(-250);

        scene.m_attacks.add(this);
        scene.m_beamSound.play();

        setTimeout(() => this.destroy(), Beam.DURATION);
    }

    update() {
    }
}