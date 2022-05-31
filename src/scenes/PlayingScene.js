import Phaser from 'phaser';
import Config from "../Config";
import Player, { Direction } from '../characters/Player';
import Enemy from '../characters/Enemy';

export default class PlayingScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // sound
    this.sound.pauseOnBlur = false;
    this.m_beamSound = this.sound.add("audio_beam");
    this.m_explosionSound = this.sound.add("audio_explosion");
    this.m_pickupSound = this.sound.add("audio_pickup");
    this.m_hurtSound = this.sound.add("audio_hurt");
    this.m_gameoverSound = this.sound.add("audio_gameover");
    this.m_pauseInSound = this.sound.add("pause_in");
    this.m_pauseOutSound = this.sound.add("pause_out");
    this.m_hitEnemySound = this.sound.add("hit_enemy");

    // background
    this.m_background = this.add.tileSprite(0, 0, Config.width, Config.height, "background");
    this.m_background.setOrigin(0, 0);

    // player
    this.m_player = new Player(this);
    this.cameras.main.startFollow(this.m_player);

    // attack
    this.m_attacks = this.add.group();

    // enemy
    this.m_enemies = this.physics.add.group();
    this.m_enemies.add(new Enemy(this, Config.width / 2 - 200, Config.height / 2 - 200, "bat", "bat_anim", 10));

    // collisions
    this.physics.add.overlap(this.m_attacks, this.m_enemies, (attack, enemy) => {
      enemy.hit(attack, 10);
    }, null, this);

    // keys
    this.m_cursorKeys = this.input.keyboard.createCursorKeys();
  }
  
  update() {
    this.handlePlayerMove();

    // camera가 가는 곳으로 background가 따라와요!
    this.m_background.setX(this.m_player.x - Config.width / 2);
    this.m_background.setY(this.m_player.y - Config.height / 2);

    // 마치 무한대 배경인 것처럼!
    this.m_background.tilePositionX = this.m_player.x - Config.width / 2;
    this.m_background.tilePositionY = this.m_player.y - Config.height / 2;
  }

  //////////////////////// FUNCTIONS ////////////////////////

  handlePlayerMove() {
    if (this.m_cursorKeys.left.isDown) {
      this.m_player.move(Direction.Left);
    } else if (this.m_cursorKeys.right.isDown) {
      this.m_player.move(Direction.Right);
    }

    if (this.m_cursorKeys.up.isDown) {
      this.m_player.move(Direction.Up);
    } else if (this.m_cursorKeys.down.isDown) {
      this.m_player.move(Direction.Down);
    }
  }
}