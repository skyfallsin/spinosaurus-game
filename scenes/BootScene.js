class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    createSprites(this);
    this.scene.start('TitleScene');
  }
}
