var config = {
  type: Phaser.AUTO,
  width: 256,
  height: 240,
  parent: 'game',
  pixelArt: true,
  roundPixels: true,
  backgroundColor: '#0f2847',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [BootScene, TitleScene, PlayScene, GameOverScene]
};

var game = new Phaser.Game(config);
