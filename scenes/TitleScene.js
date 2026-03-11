class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    this.scene.launch('PlayScene', { demoMode: true });
    this.scene.bringToTop('TitleScene');

    var overlay = this.add.rectangle(128, 120, 256, 240, 0x000000, 0.55).setInteractive();

    this.add.text(128, 55, 'SPINOSAURUS', {
      fontFamily: 'monospace', fontSize: '18px', color: '#ff4444', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(128, 78, 'SMASH', {
      fontFamily: 'monospace', fontSize: '24px', color: '#ffdd44', fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.image(128, 118, 'spino_1').setScale(2);

    this.add.text(128, 158, 'ARROWS to swim\nEat fish & sharks\nDodge predators!', {
      fontFamily: 'monospace', fontSize: '7px', color: '#aaccee', align: 'center'
    }).setOrigin(0.5);

    var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    var promptText = isMobile ? 'TAP TO START' : 'PRESS SPACE TO START';
    var prompt = this.add.text(128, 200, promptText, {
      fontFamily: 'monospace', fontSize: '8px', color: '#ffffff'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: 0.2,
      duration: 600,
      yoyo: true,
      repeat: -1
    });

    var startGame = function() {
      this.scene.stop('PlayScene');
      this.scene.start('PlayScene', { demoMode: false });
    }.bind(this);

    this.input.keyboard.once('keydown-SPACE', startGame);
    this.input.once('pointerdown', startGame);
  }
}
