class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  init(data) {
    this.demoMode = (data && data.demoMode) || false;
  }

  create() {
    this.scrollSpeed = 60;
    this.score = 0;
    this.lives = 3;
    this.invincible = false;
    this.elapsed = 0;
    this.eating = false;
    this.paused = false;
    this.dayCycle = 120000;

    this.drawBackground();

    this.plants = this.add.group();
    this.time.addEvent({ delay: 1500, callback: this.spawnPlant, callbackScope: this, loop: true });
    for (var i = 0; i < 8; i++) this.spawnPlant(Phaser.Math.Between(20, 240));

    this.bubbles = this.add.group();
    this.time.addEvent({ delay: 800, callback: this.spawnBubble, callbackScope: this, loop: true });

    this.player = this.physics.add.sprite(60, 140, 'spino_1');
    this.player.play('spino_swim');
    this.player.body.setSize(40, 16);
    this.player.body.setOffset(4, 8);
    this.player.body.setDrag(300, 300);
    this.player.body.setMaxVelocity(120, 120);
    this.player.setDepth(5);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({ up: 'W', down: 'S', left: 'A', right: 'D' });

    this.fishGroup = this.physics.add.group();
    this.sharkGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();

    this.fishTimer = this.time.addEvent({ delay: 1200, callback: this.spawnFish, callbackScope: this, loop: true });
    this.sharkTimer = this.time.addEvent({ delay: 4000, callback: this.spawnShark, callbackScope: this, loop: true });
    this.plesioTimer = this.time.addEvent({ delay: 6000, callback: this.spawnPlesiosaur, callbackScope: this, loop: true });
    this.predTimer = this.time.addEvent({ delay: 12000, callback: this.spawnPredatorX, callbackScope: this, loop: true });
    this.mosaTimer = this.time.addEvent({ delay: 8000, callback: this.spawnMosasaurus, callbackScope: this, loop: true });

    this.physics.add.overlap(this.player, this.fishGroup, this.eatFish, null, this);
    this.physics.add.overlap(this.player, this.sharkGroup, this.eatShark, null, this);
    this.physics.add.overlap(this.player, this.enemyGroup, this.hitEnemy, null, this);

    this.scoreText = this.add.text(4, 4, 'SCORE: 0', {
      fontFamily: 'monospace', fontSize: '8px', color: '#ffffff'
    }).setDepth(10);
    this.livesText = this.add.text(200, 4, 'x' + this.lives, {
      fontFamily: 'monospace', fontSize: '8px', color: '#ff4444'
    }).setDepth(10);

    this.time.addEvent({ delay: 10000, callback: this.rampDifficulty, callbackScope: this, loop: true });

    this.pauseText = this.add.text(128, 120, 'PAUSED', {
      fontFamily: 'monospace', fontSize: '16px', color: '#ffffff'
    }).setOrigin(0.5).setDepth(20).setVisible(false);

    // Mobile pause button
    var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isMobile && !this.demoMode) {
      var pauseBtn = this.add.text(240, 226, '⏸', {
        fontSize: '12px'
      }).setOrigin(0.5).setDepth(20).setInteractive();
      pauseBtn.on('pointerdown', function() { this.togglePause(); }, this);
    }

    if (this.demoMode) {
      this.scoreText.setVisible(false);
      this.livesText.setVisible(false);
      this.invincible = true;
      this.player.setVisible(false);
      this.player.body.enable = false;
      if (document.getElementById('dpad')) document.getElementById('dpad').style.display = 'none';
    } else {
      var self = this;
      if (document.getElementById('dpad') && isMobile) document.getElementById('dpad').style.display = 'block';
      this.time.delayedCall(300, function() {
        self.input.keyboard.on('keydown-SPACE', function() {
          self.togglePause();
        });
      });
    }
  }

  drawBackground() {
    // Static ocean gradient + seafloor
    var ocean = this.add.graphics();
    ocean.setDepth(-2);
    ocean.fillStyle(0x1a5a8a);
    ocean.fillRect(0, 30, 256, 40);
    ocean.fillStyle(0x144a74);
    ocean.fillRect(0, 70, 256, 50);
    ocean.fillStyle(0x0f3a5e);
    ocean.fillRect(0, 120, 256, 60);
    ocean.fillStyle(0x0a2a48);
    ocean.fillRect(0, 180, 256, 40);

    ocean.fillStyle(0x3a2a1a);
    ocean.fillRect(0, 220, 256, 20);
    ocean.fillStyle(0x4a3a28);
    for (var x = 0; x < 256; x += 6) {
      var h = Phaser.Math.Between(2, 6);
      ocean.fillRect(x, 220 - h, Phaser.Math.Between(4, 8), h);
    }

    // Light rays
    this.rayGfx = this.add.graphics();
    this.rayGfx.setDepth(-1);
    this.rayGfx.setAlpha(0.06);
    this.rayGfx.fillStyle(0xaaddff);
    for (var r = 0; r < 5; r++) {
      var rx = 30 + r * 55;
      this.rayGfx.fillTriangle(rx, 30, rx + 8, 30, rx + 20, 240);
      this.rayGfx.fillTriangle(rx + 8, 30, rx + 16, 30, rx + 28, 240);
    }

    // Dynamic sky (redrawn each frame)
    this.skyGfx = this.add.graphics();
    this.skyGfx.setDepth(-3);

    // Dynamic sun
    this.sunGfx = this.add.graphics();
    this.sunGfx.setDepth(-3);

    // Animated water surface (foreground)
    this.waterSurface = this.add.graphics();
    this.waterSurface.setDepth(7);
  }

  lerpColor(c1, c2, t) {
    var r1 = (c1 >> 16) & 0xff, g1 = (c1 >> 8) & 0xff, b1 = c1 & 0xff;
    var r2 = (c2 >> 16) & 0xff, g2 = (c2 >> 8) & 0xff, b2 = c2 & 0xff;
    var r = Math.round(r1 + (r2 - r1) * t);
    var g = Math.round(g1 + (g2 - g1) * t);
    var b = Math.round(b1 + (b2 - b1) * t);
    return (r << 16) | (g << 8) | b;
  }

  updateSky() {
    var cycle = (this.elapsed % this.dayCycle) / this.dayCycle;
    var dawn = 0xff8844;
    var day = 0x87ceeb;
    var dusk = 0xff5533;
    var night = 0x1a1a44;

    var skyColor;
    if (cycle < 0.15) {
      skyColor = this.lerpColor(dawn, day, cycle / 0.15);
    } else if (cycle < 0.7) {
      skyColor = day;
    } else if (cycle < 0.85) {
      skyColor = this.lerpColor(day, dusk, (cycle - 0.7) / 0.15);
    } else if (cycle < 0.95) {
      skyColor = this.lerpColor(dusk, night, (cycle - 0.85) / 0.1);
    } else {
      skyColor = this.lerpColor(night, dawn, (cycle - 0.95) / 0.05);
    }

    this.skyGfx.clear();
    this.skyGfx.fillStyle(skyColor);
    this.skyGfx.fillRect(0, 0, 256, 30);

    // Sun position: arc across sky
    var sunCycle = cycle;
    var sunX = 20 + sunCycle * 216;
    var sunY = 16 - Math.sin(sunCycle * Math.PI) * 8;
    var sunAlpha = 1;
    if (cycle > 0.85) sunAlpha = Math.max(0, 1 - (cycle - 0.85) / 0.1);
    else if (cycle < 0.05) sunAlpha = cycle / 0.05;

    // Sun color shifts
    var sunOuter, sunInner;
    if (cycle < 0.15 || cycle > 0.8) {
      sunOuter = 0xff6622;
      sunInner = 0xff9944;
    } else {
      sunOuter = 0xffdd44;
      sunInner = 0xffee88;
    }

    this.sunGfx.clear();
    this.sunGfx.setAlpha(sunAlpha);
    this.sunGfx.fillStyle(sunOuter);
    this.sunGfx.fillCircle(sunX, sunY, 10);
    this.sunGfx.fillStyle(sunInner);
    this.sunGfx.fillCircle(sunX, sunY, 7);

    // Adjust light ray opacity based on time of day
    if (cycle > 0.85 || cycle < 0.05) {
      this.rayGfx.setAlpha(0.02);
    } else if (cycle < 0.15 || cycle > 0.7) {
      this.rayGfx.setAlpha(0.04);
    } else {
      this.rayGfx.setAlpha(0.06);
    }
  }

  updateWaves() {
    this.waterSurface.clear();
    var t = this.elapsed * 0.003;

    this.waterSurface.fillStyle(0x1a5a8a);
    this.waterSurface.fillRect(0, 30, 256, 4);

    this.waterSurface.fillStyle(0x4499cc);
    for (var x = 0; x < 256; x += 2) {
      var wy = 28 + Math.sin(t + x * 0.08) * 1;
      this.waterSurface.fillRect(x, wy, 2, 2);
    }

    this.waterSurface.fillStyle(0xddeeff);
    for (var x2 = 0; x2 < 256; x2 += 4) {
      var wy2 = 26 + Math.sin(t * 1.3 + x2 * 0.1) * 1.5;
      this.waterSurface.fillRect(x2, wy2, 3, 2);
    }
  }

  update(time, delta) {
    if (this.paused) return;
    this.elapsed += delta;

    var speed = 200;
    var vk = window.virtualKeys || {};
    if (this.cursors.up.isDown || this.wasd.up.isDown || vk.up) this.player.body.setVelocityY(-speed);
    else if (this.cursors.down.isDown || this.wasd.down.isDown || vk.down) this.player.body.setVelocityY(speed);
    if (this.cursors.left.isDown || this.wasd.left.isDown || vk.left) this.player.body.setVelocityX(-speed);
    else if (this.cursors.right.isDown || this.wasd.right.isDown || vk.right) this.player.body.setVelocityX(speed);

    if (this.player.y < 36) this.player.y = 36;
    if (this.player.y > 215) this.player.y = 215;
    if (this.player.x < 20) this.player.x = 20;
    if (this.player.x > 200) this.player.x = 200;

    this.updateSky();
    this.updateWaves();

    var self = this;
    this.bubbles.getChildren().forEach(function(b) {
      b.y -= 0.3;
      b.x += Math.sin(b.y * 0.1) * 0.2;
      if (b.y < 28) b.destroy();
    });

    this.plants.getChildren().forEach(function(p) {
      p.x -= self.scrollSpeed * delta / 1000;
      if (p.x < -16) p.destroy();
    });

    this.enemyGroup.getChildren().forEach(function(e) {
      if (e.texture.key.indexOf('predatorx') === 0) {
        e.y += Math.sin(self.elapsed * 0.003 + e.x * 0.1) * 0.5;
      }
      if (e.texture.key.indexOf('mosasaurus') === 0) {
        e.y += Math.sin(self.elapsed * 0.004 + e.x * 0.08) * 0.3;
      }
    });

    this.cleanGroup(this.fishGroup);
    this.cleanGroup(this.sharkGroup);
    this.cleanGroup(this.enemyGroup);
  }

  cleanGroup(group) {
    group.getChildren().forEach(function(c) {
      if (c.x < -60) c.destroy();
    });
  }

  spawnPlant(startX) {
    var x = startX || 270;
    var type = Phaser.Math.Between(0, 1) === 0 ? 'seaweed' : 'fern';
    var h = type === 'seaweed' ? 32 : 24;
    var p = this.add.image(x, 220 - h / 2 + Phaser.Math.Between(-2, 2), type);
    p.setDepth(0);
    p.setAlpha(Phaser.Math.FloatBetween(0.5, 0.8));
    this.plants.add(p);
  }

  spawnBubble() {
    var x = Phaser.Math.Between(10, 246);
    var b = this.add.image(x, 235, 'bubble');
    b.setAlpha(Phaser.Math.FloatBetween(0.3, 0.7));
    b.setScale(Phaser.Math.FloatBetween(0.5, 1.5));
    b.setDepth(1);
    this.bubbles.add(b);
  }

  spawnFish() {
    var y = Phaser.Math.Between(40, 210);
    var f = this.fishGroup.create(270, y, 'fish');
    f.setVelocityX(-(this.scrollSpeed + Phaser.Math.Between(10, 40)));
    f.body.setAllowGravity(false);
    f.setFlipX(true);
    f.setDepth(3);
  }

  spawnShark() {
    var y = Phaser.Math.Between(50, 200);
    var s = this.sharkGroup.create(280, y, 'shark');
    s.setVelocityX(-(this.scrollSpeed + Phaser.Math.Between(20, 50)));
    s.body.setAllowGravity(false);
    s.setFlipX(true);
    s.setDepth(3);
  }

  spawnPlesiosaur() {
    var y = Phaser.Math.Between(50, 180);
    var e = this.enemyGroup.create(290, y, 'plesiosaur_1');
    e.play('plesio_swim');
    e.setVelocityX(-(this.scrollSpeed + Phaser.Math.Between(15, 35)));
    e.body.setAllowGravity(false);
    e.setFlipX(true);
    e.setDepth(4);
  }

  spawnPredatorX() {
    var y = Phaser.Math.Between(60, 170);
    var e = this.enemyGroup.create(300, y, 'predatorx_1');
    e.play('predx_swim');
    e.setVelocityX(-(this.scrollSpeed + Phaser.Math.Between(30, 60)));
    e.body.setAllowGravity(false);
    e.setFlipX(true);
    e.setDepth(4);
  }

  spawnMosasaurus() {
    var y = Phaser.Math.Between(50, 180);
    var e = this.enemyGroup.create(295, y, 'mosasaurus_1');
    e.play('mosa_swim');
    e.setVelocityX(-(this.scrollSpeed + Phaser.Math.Between(25, 55)));
    e.body.setAllowGravity(false);
    e.setFlipX(true);
    e.setDepth(4);
  }

  showScorePopup(x, y, pts) {
    var popup = this.add.text(x, y, '+' + pts, {
      fontFamily: 'monospace', fontSize: '8px', color: '#ffff00'
    }).setDepth(10);
    this.tweens.add({
      targets: popup,
      y: y - 20,
      alpha: 0,
      duration: 800,
      onComplete: function() { popup.destroy(); }
    });
  }

  playEatAnim() {
    if (this.eating) return;
    this.eating = true;
    this.player.stop();
    this.player.setTexture('spino_eat');
    this.time.delayedCall(250, function() {
      this.player.play('spino_swim');
      this.eating = false;
    }, [], this);
  }

  eatFish(player, fish) {
    this.showScorePopup(fish.x, fish.y, 10);
    fish.destroy();
    this.score += 10;
    this.scoreText.setText('SCORE: ' + this.score);
    this.playEatAnim();
  }

  eatShark(player, shark) {
    this.showScorePopup(shark.x, shark.y, 50);
    shark.destroy();
    this.score += 50;
    this.scoreText.setText('SCORE: ' + this.score);
    this.cameras.main.shake(100, 0.01);
    this.playEatAnim();
  }

  togglePause() {
    this.paused = !this.paused;
    if (this.paused) {
      this.physics.pause();
      this.time.paused = true;
      this.tweens.pauseAll();
      this.pauseText.setVisible(true);
    } else {
      this.physics.resume();
      this.time.paused = false;
      this.tweens.resumeAll();
      this.pauseText.setVisible(false);
    }
  }

  hitEnemy(player, enemy) {
    if (this.invincible) return;

    this.lives--;
    this.livesText.setText('x' + this.lives);
    this.cameras.main.shake(200, 0.02);

    if (this.lives <= 0) {
      this.scene.start('GameOverScene', { score: this.score });
      return;
    }

    this.invincible = true;
    this.tweens.add({
      targets: player,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 8,
      onComplete: function() {
        player.setAlpha(1);
        this.invincible = false;
      }.bind(this)
    });
  }

  rampDifficulty() {
    this.scrollSpeed = Math.min(this.scrollSpeed + 5, 140);
    this.fishTimer.delay = Math.max(this.fishTimer.delay - 50, 500);
    this.sharkTimer.delay = Math.max(this.sharkTimer.delay - 200, 1500);
    this.plesioTimer.delay = Math.max(this.plesioTimer.delay - 300, 2500);
    this.predTimer.delay = Math.max(this.predTimer.delay - 500, 5000);
    this.mosaTimer.delay = Math.max(this.mosaTimer.delay - 400, 3500);
  }
}
