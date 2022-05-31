import Phaser from 'phaser';
import Config from "../Config";
import Player, { Direction } from '../characters/Player';

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

    // keys
    this.m_cursorKeys = this.input.keyboard.createCursorKeys();
    console.log(this.m_cursorKeys);
  }
  
  update() {
    this.handlePlayerMove();
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