function createSprites(scene) {
  for (var f = 0; f < 2; f++) {
    var g = scene.make.graphics({ add: false });
    drawSpino(g, f === 0 ? 0 : 2);
    g.generateTexture('spino_' + (f + 1), 48, 26);
    g.destroy();
  }

  var ge = scene.make.graphics({ add: false });
  drawSpino(ge, 0, 3);
  ge.generateTexture('spino_eat', 48, 28);
  ge.destroy();

  scene.anims.create({
    key: 'spino_swim',
    frames: [{ key: 'spino_1' }, { key: 'spino_2' }],
    frameRate: 4,
    repeat: -1
  });

  drawFish(scene);
  drawShark(scene);
  drawPlesiosaur(scene);
  drawPredatorX(scene);
  drawMosasaurus(scene);
  drawBubble(scene);
  drawSeaweed(scene);
  drawFern(scene);
}

function drawBubble(scene) {
  var g = scene.make.graphics({ add: false });
  g.fillStyle(0xaaddff);
  g.fillRect(1, 0, 2, 1);
  g.fillRect(0, 1, 1, 2);
  g.fillRect(3, 1, 1, 2);
  g.fillRect(1, 3, 2, 1);
  g.fillStyle(0xcceeFF);
  g.fillRect(1, 1, 2, 2);
  g.fillStyle(0xffffff);
  g.fillRect(1, 1, 1, 1);
  g.generateTexture('bubble', 4, 4);
  g.destroy();
}

function drawPlesiosaur(scene) {
  var body = 0x2266aa;
  var belly = 0x4488cc;
  var dark = 0x114477;

  for (var f = 0; f < 2; f++) {
    var g = scene.make.graphics({ add: false });
    var nk = f === 0 ? 0 : 1;
    var fl = f === 0 ? 0 : 2;

    g.fillStyle(body);
    g.fillRect(6, 12, 16, 8);
    g.fillRect(4, 13, 2, 6);
    g.fillRect(22, 13, 2, 6);

    g.fillStyle(belly);
    g.fillRect(7, 17, 14, 4);
    g.fillRect(5, 16, 2, 4);

    g.fillStyle(body);
    g.fillRect(24, 11 + nk, 3, 4);
    g.fillRect(26, 9 + nk, 3, 4);
    g.fillRect(28, 7, 3, 4);
    g.fillRect(30, 5 - nk, 3, 4);
    g.fillStyle(belly);
    g.fillRect(25, 13 + nk, 2, 2);
    g.fillRect(27, 11 + nk, 2, 2);
    g.fillRect(29, 9, 2, 2);
    g.fillRect(31, 7 - nk, 2, 2);

    g.fillStyle(body);
    g.fillRect(32, 3 - nk, 4, 4);
    g.fillRect(36, 4 - nk, 2, 3);
    g.fillStyle(0xffffff);
    g.fillRect(34, 4 - nk, 1, 1);
    g.fillStyle(0x222222);
    g.fillRect(35, 4 - nk, 1, 1);
    g.fillStyle(dark);
    g.fillRect(36, 6 - nk, 2, 1);

    g.fillStyle(body);
    g.fillRect(2, 14, 3, 4);
    g.fillRect(0, 15, 2, 3);
    g.fillStyle(dark);
    g.fillRect(0, 15, 1, 1);
    g.fillRect(0, 17, 1, 1);

    g.fillStyle(dark);
    g.fillRect(8, 20 - fl, 4, 2);
    g.fillRect(7, 21 - fl, 2, 1);
    g.fillRect(16, 20 - fl, 4, 2);
    g.fillRect(15, 21 - fl, 2, 1);
    g.fillRect(10, 11 + fl, 3, 2);
    g.fillRect(17, 11 + fl, 3, 2);

    g.generateTexture('plesiosaur_' + (f + 1), 38, 24);
    g.destroy();
  }

  scene.anims.create({
    key: 'plesio_swim',
    frames: [{ key: 'plesiosaur_1' }, { key: 'plesiosaur_2' }],
    frameRate: 3,
    repeat: -1
  });
}

function drawPredatorX(scene) {
  var body = 0x1a1a3a;
  var belly = 0x333366;
  var dark = 0x0a0a20;
  var teeth = 0xeeeedd;

  for (var f = 0; f < 2; f++) {
    var g = scene.make.graphics({ add: false });
    var fl = f === 0 ? 0 : 2;
    var jaw = f === 0 ? 0 : 1;

    g.fillStyle(body);
    g.fillRect(8, 8, 22, 10);
    g.fillRect(6, 9, 2, 8);
    g.fillRect(30, 9, 3, 8);

    g.fillStyle(belly);
    g.fillRect(9, 15, 20, 4);
    g.fillRect(6, 14, 3, 4);

    g.fillStyle(body);
    g.fillRect(33, 7, 4, 10 + jaw);
    g.fillRect(37, 8, 5, 8 + jaw);
    g.fillRect(42, 9, 4, 6 + jaw);
    g.fillRect(46, 10, 2, 4 + jaw);

    g.fillRect(33, 17 + jaw, 4, 2);
    g.fillRect(37, 16 + jaw, 5, 2);
    g.fillRect(42, 15 + jaw, 4, 2);

    g.fillStyle(0x440000);
    g.fillRect(34, 15, 12, 2 + jaw);

    g.fillStyle(teeth);
    g.fillRect(35, 14, 1, 2);
    g.fillRect(37, 14, 1, 2);
    g.fillRect(39, 13, 1, 2);
    g.fillRect(41, 13, 1, 2);
    g.fillRect(43, 13, 1, 2);
    g.fillRect(36, 15 + jaw, 1, 2);
    g.fillRect(38, 15 + jaw, 1, 2);
    g.fillRect(40, 15 + jaw, 1, 2);
    g.fillRect(42, 14 + jaw, 1, 2);
    g.fillRect(44, 14 + jaw, 1, 1);

    g.fillStyle(0xff2222);
    g.fillRect(35, 9, 2, 2);
    g.fillStyle(0x222222);
    g.fillRect(36, 9, 1, 1);

    g.fillStyle(dark);
    g.fillRect(37, 8, 5, 1);
    g.fillRect(42, 9, 4, 1);
    g.fillRect(46, 10, 2, 1);

    g.fillStyle(body);
    g.fillRect(4, 10, 4, 6);
    g.fillRect(1, 11, 4, 4);
    g.fillRect(0, 12, 2, 3);
    g.fillStyle(dark);
    g.fillRect(0, 11, 1, 1);
    g.fillRect(0, 15, 1, 1);

    g.fillStyle(dark);
    g.fillRect(12, 18 - fl, 5, 3);
    g.fillRect(11, 19 - fl, 2, 2);
    g.fillRect(22, 18 - fl, 5, 3);
    g.fillRect(21, 19 - fl, 2, 2);
    g.fillRect(14, 6 + fl, 4, 2);
    g.fillRect(23, 6 + fl, 4, 2);

    g.generateTexture('predatorx_' + (f + 1), 48, 23);
    g.destroy();
  }

  scene.anims.create({
    key: 'predx_swim',
    frames: [{ key: 'predatorx_1' }, { key: 'predatorx_2' }],
    frameRate: 3,
    repeat: -1
  });
}

function drawFish(scene) {
  var g = scene.make.graphics({ add: false });
  g.fillStyle(0xe8a020);
  g.fillRect(3, 2, 6, 4);
  g.fillRect(2, 3, 1, 2);
  g.fillRect(9, 3, 2, 2);
  g.fillRect(0, 1, 2, 2);
  g.fillRect(0, 5, 2, 2);
  g.fillStyle(0xf0c040);
  g.fillRect(4, 3, 4, 2);
  g.fillStyle(0xffffff);
  g.fillRect(8, 3, 1, 1);
  g.fillStyle(0x222222);
  g.fillRect(9, 3, 1, 1);
  g.fillStyle(0xe87020);
  g.fillRect(5, 2, 2, 1);
  g.fillRect(5, 5, 2, 1);
  g.generateTexture('fish', 12, 8);
  g.destroy();
}

function drawShark(scene) {
  var g = scene.make.graphics({ add: false });
  g.fillStyle(0x667788);
  g.fillRect(4, 5, 14, 5);
  g.fillRect(2, 6, 2, 3);
  g.fillRect(18, 6, 4, 3);
  g.fillRect(0, 7, 2, 2);
  g.fillRect(22, 7, 2, 2);
  g.fillRect(10, 2, 2, 3);
  g.fillRect(9, 3, 1, 2);
  g.fillRect(12, 3, 1, 2);
  g.fillStyle(0xccddee);
  g.fillRect(5, 9, 12, 2);
  g.fillRect(3, 8, 2, 2);
  g.fillStyle(0xffffff);
  g.fillRect(19, 6, 1, 1);
  g.fillStyle(0x222222);
  g.fillRect(20, 6, 1, 1);
  g.fillStyle(0x445566);
  g.fillRect(0, 9, 2, 1);
  g.fillRect(0, 6, 2, 1);
  g.generateTexture('shark', 24, 12);
  g.destroy();
}

function drawSeaweed(scene) {
  var g = scene.make.graphics({ add: false });
  g.fillStyle(0x1a6633);
  g.fillRect(3, 0, 2, 32);
  g.fillRect(2, 4, 1, 6);
  g.fillRect(5, 8, 1, 6);
  g.fillRect(1, 14, 1, 5);
  g.fillRect(5, 20, 1, 5);
  g.fillRect(2, 26, 1, 4);
  g.fillStyle(0x228844);
  g.fillRect(3, 2, 1, 28);
  g.fillRect(2, 6, 1, 4);
  g.fillRect(5, 10, 1, 4);
  g.fillRect(1, 16, 1, 3);
  g.fillRect(5, 22, 1, 3);
  g.fillStyle(0x2eaa55);
  g.fillRect(0, 0, 2, 3);
  g.fillRect(6, 2, 2, 3);
  g.fillRect(0, 10, 1, 3);
  g.fillRect(7, 6, 1, 3);
  g.generateTexture('seaweed', 8, 32);
  g.destroy();
}

function drawFern(scene) {
  var g = scene.make.graphics({ add: false });
  g.fillStyle(0x226644);
  g.fillRect(7, 4, 2, 20);
  g.fillRect(3, 0, 2, 4);
  g.fillRect(5, 2, 2, 4);
  g.fillRect(11, 0, 2, 4);
  g.fillRect(9, 2, 2, 4);
  g.fillRect(1, 6, 3, 2);
  g.fillRect(12, 6, 3, 2);
  g.fillRect(2, 10, 3, 2);
  g.fillRect(11, 10, 3, 2);
  g.fillRect(3, 14, 3, 2);
  g.fillRect(10, 14, 3, 2);
  g.fillStyle(0x339955);
  g.fillRect(4, 1, 1, 3);
  g.fillRect(11, 1, 1, 3);
  g.fillRect(2, 7, 2, 1);
  g.fillRect(12, 7, 2, 1);
  g.fillRect(3, 11, 2, 1);
  g.fillRect(11, 11, 2, 1);
  g.generateTexture('fern', 16, 24);
  g.destroy();
}

function drawMosasaurus(scene) {
  var body = 0x2a4a3a;
  var belly = 0x5a8a6a;
  var dark = 0x1a3328;
  var teeth = 0xeeeedd;

  for (var f = 0; f < 2; f++) {
    var g = scene.make.graphics({ add: false });
    var fl = f === 0 ? 0 : 2;
    var tail = f === 0 ? 0 : 1;

    // Tail (left side, with fluke)
    g.fillStyle(body);
    g.fillRect(0, 8 - tail, 3, 4);
    g.fillRect(3, 7, 3, 5);
    g.fillRect(6, 7, 3, 4);
    g.fillStyle(dark);
    g.fillRect(0, 7 - tail, 2, 1);
    g.fillRect(0, 12 - tail, 2, 1);

    // Body (long, streamlined)
    g.fillStyle(body);
    g.fillRect(9, 6, 20, 7);
    g.fillRect(7, 7, 2, 5);

    // Belly
    g.fillStyle(belly);
    g.fillRect(10, 11, 18, 3);
    g.fillRect(7, 10, 3, 3);

    // Neck (short, thick)
    g.fillStyle(body);
    g.fillRect(29, 6, 4, 6);

    // Head (large jaws, monitor lizard-like)
    g.fillRect(33, 5, 5, 7);
    g.fillRect(38, 6, 4, 5);
    g.fillRect(42, 7, 3, 3);

    // Lower jaw
    g.fillRect(33, 12, 5, 2);
    g.fillRect(38, 11, 4, 2);
    g.fillRect(42, 10, 2, 2);

    // Mouth interior
    g.fillStyle(0x331111);
    g.fillRect(34, 11, 10, 1);

    // Teeth
    g.fillStyle(teeth);
    g.fillRect(35, 10, 1, 2);
    g.fillRect(37, 10, 1, 2);
    g.fillRect(39, 10, 1, 1);
    g.fillRect(41, 9, 1, 1);
    g.fillRect(36, 11, 1, 2);
    g.fillRect(38, 11, 1, 2);
    g.fillRect(40, 10, 1, 2);

    // Eye
    g.fillStyle(0xffcc00);
    g.fillRect(35, 6, 2, 2);
    g.fillStyle(0x222222);
    g.fillRect(36, 6, 1, 1);

    // Snout ridge
    g.fillStyle(dark);
    g.fillRect(38, 6, 4, 1);
    g.fillRect(42, 7, 3, 1);

    // Flippers (four, paddle-like)
    g.fillStyle(dark);
    g.fillRect(12, 13 + fl, 4, 2);
    g.fillRect(11, 14 + fl, 2, 1);
    g.fillRect(22, 13 + fl, 4, 2);
    g.fillRect(21, 14 + fl, 2, 1);
    g.fillRect(14, 5 - fl, 3, 2);
    g.fillRect(23, 5 - fl, 3, 2);

    // Dorsal ridge
    g.fillStyle(dark);
    g.fillRect(15, 5, 8, 1);
    g.fillRect(17, 4, 4, 1);

    g.generateTexture('mosasaurus_' + (f + 1), 45, 18);
    g.destroy();
  }

  scene.anims.create({
    key: 'mosa_swim',
    frames: [{ key: 'mosasaurus_1' }, { key: 'mosasaurus_2' }],
    frameRate: 3,
    repeat: -1
  });
}

function drawSpino(g, tailYOff, jawOpen) {
  var body = 0xd4a860;
  var belly = 0xe8cc88;
  var sail = 0xcc2222;
  var sailHi = 0xe84444;
  var shadow = 0x8a6520;
  var teeth = 0xeeeedd;
  var dark = 0x5a3d10;
  var jo = jawOpen || 0;

  // === SAIL (tall, prominent) ===
  g.fillStyle(sail);
  g.fillRect(19, 0, 2, 11);
  g.fillRect(17, 2, 2, 9);
  g.fillRect(21, 1, 2, 10);
  g.fillRect(15, 4, 2, 7);
  g.fillRect(23, 3, 2, 8);
  g.fillRect(13, 6, 2, 5);
  g.fillRect(25, 5, 2, 6);
  g.fillRect(27, 7, 1, 4);
  g.fillStyle(sailHi);
  g.fillRect(18, 1, 1, 7);
  g.fillRect(20, 0, 1, 5);
  g.fillRect(22, 2, 1, 5);
  g.fillRect(16, 5, 1, 3);
  g.fillRect(24, 4, 1, 4);

  // === BODY (elongated) ===
  g.fillStyle(body);
  g.fillRect(9, 11, 20, 6);
  g.fillRect(7, 12, 2, 4);

  // === BELLY ===
  g.fillStyle(belly);
  g.fillRect(10, 15, 18, 3);
  g.fillRect(7, 14, 3, 3);

  // === TAIL ===
  g.fillStyle(body);
  g.fillRect(4, 13 + tailYOff, 4, 3);
  g.fillRect(1, 14 + tailYOff, 4, 2);
  g.fillStyle(belly);
  g.fillRect(4, 15 + tailYOff, 4, 1);
  g.fillRect(1, 15 + tailYOff, 3, 1);
  g.fillStyle(shadow);
  g.fillRect(0, 14 + tailYOff, 2, 1);
  g.fillRect(0, 15 + tailYOff, 1, 1);

  // === NECK ===
  g.fillStyle(body);
  g.fillRect(29, 11, 4, 5);
  g.fillStyle(belly);
  g.fillRect(29, 15, 4, 2);

  // === HEAD (upper snout tilts up when eating) ===
  g.fillStyle(body);
  g.fillRect(33, 10 - jo, 4, 5);

  // === SNOUT (long, narrow, croc-like) ===
  g.fillRect(37, 10 - jo, 5, 4);
  g.fillRect(42, 11 - jo, 4, 3);
  g.fillRect(46, 12 - jo, 2, 2);

  // === LOWER JAW (drops when eating) ===
  g.fillRect(33, 16 + jo, 4, 2);
  g.fillRect(37, 16 + jo, 5, 2);
  g.fillRect(42, 16 + jo, 3, 1);

  // === SNOUT RIDGE (darker top) ===
  g.fillStyle(shadow);
  g.fillRect(37, 10 - jo, 5, 1);
  g.fillRect(42, 11 - jo, 4, 1);
  g.fillRect(46, 12 - jo, 2, 1);

  // === MOUTH INTERIOR (wider when eating) ===
  g.fillStyle(dark);
  g.fillRect(33, 14 - jo, 14, 2 + jo * 2);

  // === TEETH (sharp, visible in mouth gap) ===
  g.fillStyle(teeth);
  g.fillRect(35, 14 - jo, 1, 2);
  g.fillRect(37, 14 - jo, 1, 2);
  g.fillRect(39, 14 - jo, 1, 2);
  g.fillRect(41, 14 - jo, 1, 1);
  g.fillRect(43, 14 - jo, 1, 1);
  g.fillRect(36, 15 + jo, 1, 2);
  g.fillRect(38, 15 + jo, 1, 2);
  g.fillRect(40, 15 + jo, 1, 2);
  g.fillRect(42, 15 + jo, 1, 2);

  // === EYE ===
  g.fillStyle(0xffffff);
  g.fillRect(34, 11 - jo, 2, 2);
  g.fillStyle(0x222222);
  g.fillRect(35, 11 - jo, 1, 1);

  // === NOSTRIL ===
  g.fillStyle(dark);
  g.fillRect(47, 12 - jo, 1, 1);

  // === FRONT ARM (small) ===
  g.fillStyle(shadow);
  g.fillRect(28, 17, 1, 2);
  g.fillRect(29, 18, 1, 1);

  // === HIND LEG (tucked) ===
  g.fillRect(14, 17, 2, 2);
  g.fillRect(16, 18, 1, 1);

  // === BODY BOTTOM OUTLINE ===
  g.fillStyle(shadow);
  g.fillRect(9, 17, 20, 1);
}
