class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    if (document.getElementById('dpad')) document.getElementById('dpad').style.display = 'none';
    this.add.rectangle(128, 120, 256, 240, 0x000000, 0.01).setInteractive();
    this.add.text(128, 80, 'GAME OVER', {
      fontFamily: 'monospace', fontSize: '16px', color: '#ff4444'
    }).setOrigin(0.5);

    this.add.text(128, 110, 'SCORE: ' + this.finalScore, {
      fontFamily: 'monospace', fontSize: '12px', color: '#ffffff'
    }).setOrigin(0.5);

    var best = localStorage.getItem('spino_best') || 0;
    if (this.finalScore > best) {
      best = this.finalScore;
      localStorage.setItem('spino_best', best);
    }
    this.add.text(128, 130, 'BEST: ' + best, {
      fontFamily: 'monospace', fontSize: '10px', color: '#aaaaaa'
    }).setOrigin(0.5);

    var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.add.text(128, 170, isMobile ? 'TAP TO RESTART' : 'PRESS SPACE TO RESTART', {
      fontFamily: 'monospace', fontSize: '8px', color: '#88aacc'
    }).setOrigin(0.5);

    var restart = function() {
      this.scene.start('TitleScene');
    }.bind(this);

    this.input.keyboard.once('keydown-SPACE', restart);
    this.input.once('pointerdown', restart);
  }
}
