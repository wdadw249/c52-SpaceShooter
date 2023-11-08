//Declaring Variables
var gameState = 1, level1 = 2,level2 = 3, END = 6, level3 = 4, WIN = 7
var buttonClicked = false; var startButton, title, newGameButton
var backgroundImage, losingBackgroundImage, level2Background, level3Background, winBackground
var spaceShip, spaceShipImage, bulletsGroup, spaceShipBulletImage, spaceShipSound, playerDestroySound
var level1TextVisible = false, level1Text, level1TextImage
var level2Textvisible = false, level2Text, level2TextImage
var level3TextVisible = false, level3Text, level3TextImage
var backgroundSound;
var enmeySpawnPosition = [60, 200, 380, 530, 60, 200, 380, 530, 60, 200, 380, 530]
var shootingAlligible = false, movementAlligable = false
var enemyGroup, enemyImage, enemyBulletImage, enemyBulletSound; 
var enemyBulletGroup
var enemies = 0, losingSound, explosionSound
var damageSound, enemyDestroySound, impactSound, whooshSound
var life = 3, heartImage
var score = 0
var level2StartTime = 0, level2Warning = false
var level3StartTime = 0
var ENDStartTime = 0
var meteoriteImage, meteoriteGroup, winningLevelSound, meteorSwooshSound
var hasPlayed = false
var explosionAnimation
var meteor = 0
var meteorAnimation, hasPlayed2 = false, hasPlayedExplosion = false
var level3Warning = false, level3WarningImage
var bossImage, bossBulletImage, bossBulletGroupRight, bossBulletGroupLeft, bossLaserGroup
var bossBulletSound
var bossLaserImage, boss, bossDirection = true
var intenseMusic, laserCollision = false, laserSound, bulletPhase = true
var bossLife = 100, bossLifeImage, emptyLife, winningSound, hasPlayed3 = false, winStartTime = 0
var hasPlayedExplosion2 = false, explosions


function preload() {
  //Loading the images and sounds
  backgroundImage = loadImage("assets/background.jpg");
  spaceShipImage = loadImage("assets/spaceShip.png");
  level1TextImage = loadImage("assets/level1.png");
  enemyImage = loadImage("assets/enemy.png")
  enemyBulletImage = loadImage("assets/enemyBullet.png")
  spaceShipBulletImage = loadImage('assets/playerBullet.png')
  heartImage = loadImage("assets/heart.png")
  losingBackgroundImage = loadImage("assets/gameOvers.jpg")
  level2Background = loadImage("assets/level2Background.png")
  level2TextImage = loadImage("assets/level2.png")
  meteoriteImage = loadImage("assets/meteorite.png")  
  level3Background = loadImage("assets/level3Background.png")
  level3TextImage = loadImage("assets/level3.png")
  level3WarningImage = loadImage("assets/bossIncoming.png")
  bossImage = loadImage('assets/boss2.png')
  bossBulletImage = loadImage("assets/bossBullet.png")
  bossLaserImage = loadImage("assets/bossLasers.png")
  bossLifeImage = loadImage("assets/bossHealth.png")
  emptyLife = loadImage("assets/emptyLife.png")
  winBackground = loadImage('assets/winBackground.jpg')
  var meteorArray = [
    "met1.png", "met1.png", "met1.png",
    "met2.png", "met2.png", "met2.png",
    "met3.png", "met3.png", "met3.png"
  ];
  meteorAnimation = loadAnimation(...meteorArray);

explosionAnimation = loadAnimation(
  "animation/Ex1.png", "animation/Ex1.png", "animation/Ex1.png", "animation/Ex1.png", "animation/Ex1.png",
  "animation/Ex2.png", "animation/Ex2.png", "animation/Ex2.png", "animation/Ex2.png", "animation/Ex2.png",
  "animation/Ex3.png", "animation/Ex3.png", "animation/Ex3.png", "animation/Ex3.png", "animation/Ex3.png"
);


  meteorSwooshSound = loadSound("assets/swoosh.mp3")
  losingSound = loadSound("assets/losingSound.mp3")
  explosionSound = loadSound("assets/impact.mp3")
  damageSound = loadSound("assets/damage.mp3")
  enemyDestroySound = loadSound("assets/takingDamge.mp3")
  impactSound = loadSound("assets/explosion.mp3")
  backgroundSound = loadSound("assets/backgroundS.mp3");
  spaceShipSound = loadSound("assets/playerShoot.mp3")
  enemyBulletSound = loadSound("assets/enemyShooting.mp3")
  whooshSound = loadSound("assets/whoosh.mp3")
  winningLevelSound = loadSound("assets/victoryLevel.mp3")
  playerDestroySound = loadSound("assets/playerDestroySound.mp3")
  bossBulletSound = loadSound("assets/enemyShoot.mp3")
  intenseMusic = loadSound('assets/dramaticSound.mp3')
  laserSound = loadSound('assets/laserSound.mp3')
  winningSound = loadSound("assets/winSound.mp3")
}

function setup() {
  
  //Creating canvas width and height
  createCanvas(windowWidth-1, windowHeight-1);
  //Pressing the start button will start the game
  startButton = select("#startButton");
  startButton.mousePressed(startGame);

  newGameButton = select("#newGame")
  //Making the title
  title = select("#titleImage");

  spaceShip = createSprite(250, 280, 50, 50);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.5;
  spaceShip.visible = false

  level1Text = createSprite(width / 2, height / 2, 40, 40);
  level1Text.addImage(level1TextImage);
  level1Text.scale = 0.4
  level1Text.visible = false;
  textAlign(CENTER, CENTER);

  level2Text = createSprite(width/2, height/2, 40, 40)
  level2Text.addImage(level2TextImage)
  level2Text.scale = 0.4
  level2Text.visible = false;

  level3Text = createSprite(width/2, height/2, 40, 40)
  level3Text.addImage(level3TextImage)
  level3Text.scale = 0.4
  level3Text.visible = false;

  boss = createSprite(width, height/2, 500, 500)
  boss.addImage(bossImage)
  boss.visible = false


  backgroundSound.setVolume(0.8);
  backgroundSound.loop();

  intenseMusic.loop()
  intenseMusic.setVolume(0)
  spaceShipSound.setVolume(0.2)

  //Making groups
  bossLaserGroup = new Group()
  bossBulletGroupRight = new Group()
  bossBulletGroupLeft = new Group()
  meteoriteGroup = new Group()
  bulletsGroup = new Group(); 
  enemyGroup = new Group();
  enemyBulletGroup = new Group();
}

function draw() {
  //If You lost all of you life this would happen
  if(life <= 0){
  
  if(!hasPlayedExplosion){
    playerDestroySound.play()
    hasPlayedExplosion = true
    var explosion = createSprite(spaceShip.position.x, spaceShip.position.y, 50,50)
  explosion.addAnimation("default", explosionAnimation)
  }

  if (ENDStartTime === 0) {
    ENDStartTime = millis(); // Record the start time
  }
  // Checks if 2 seconds have passed
  if (millis() - ENDStartTime >= 1000) {
    gameState = END;
    spaceShip.visible = false;
    bulletsGroup.removeSprites();
    enemyBulletGroup.removeSprites();
    enemyGroup.removeSprites()
    meteoriteGroup.removeSprites()
    if(!hasPlayed2){
      losingSound.play()
      hasPlayed2 = true
    }
    losingSound.setVolume(3)
    meteorSwooshSound.setVolume(0)
  }
}

  //Code for level 1
  if (gameState === level1) {
    background(backgroundImage)
    
    if (level1TextVisible) {
      displaylevel1Text();
      backgroundSound.setVolume(0)
      if (!hasPlayed) {
        winningLevelSound.play();
        hasPlayed = true;
      }
    } else {
      if(life <= 0){
        backgroundSound.setVolume(0)
      }else{
        backgroundSound.setVolume(0.7)
        spaceShipMovement();
      }
      
      
      handleBullets();
      spawnEnemy();
      handleBulletCollision()
      handleEnemyBullets();
      displayLives()

      if (score >= 12) {
        if (level2StartTime === 0) {
          level2StartTime = millis(); // Record the start time
        }
        // Check if 2 seconds have passed
        if (millis() - level2StartTime >= 2000) {
          gameState = level2;
          level2Textvisible = true;
          spaceShip.visible = false;
          bulletsGroup.removeSprites();
          enemyBulletGroup.removeSprites();
          enemyGroup.removeSprites()
          winningLevelSound.play()
          spaceShip.position.y = height/2
        }
      }
    }
    drawSprites();
  }

  //Code for level2
  if (gameState === level2) {
    background(level2Background)
    if(level2Textvisible){
        displaylevel2Text()
        backgroundSound.setVolume(0)
    }else{
      if(life <= 0){
        backgroundSound.setVolume(0)
      }else{
        backgroundSound.setVolume(0.7)
        spaceShipMovement();
      }
      if(level2Warning){
        fill("red")
        textSize(40)
        text("Watch out for the meteorites", width/2, height/2)
      }

      displayLives()
      handleBullets()
      spawnMeteorites()
      handleMeteorites()
      handleMeteoriteCollision()

      if (meteor >= 40) {
        if (level3StartTime === 0) {
          level3StartTime = millis();
        }
        if (millis() - level3StartTime >= 4000) {
          gameState = level3;
          bulletsGroup.removeSprites();
          meteoriteGroup.removeSprites();
          level3TextVisible = true;
          spaceShip.position.y = height/2
          winningLevelSound.play()
          spaceShip.visible = false;
        }
      }
    }
  drawSprites()
  }

  //Code for level3
  if(gameState === level3){
    background(level3Background)
    backgroundSound.setVolume(0)
    if(level3TextVisible){
      displaylevel3Text()
      
    }else{
      if(life <= 0){
        intenseMusic.setVolume(0)
      }else{
        intenseMusic.setVolume(0.8)

        //If alligble to shoot the we call spaceshipMovement
        if(movementAlligable){
          spaceShipMovement();
        }
      }

      //Displaying Boss Incoming Warning
      if(level3Warning){
        image(level3WarningImage, width/2 - 220, 40 , 500, 500)
      }

      displayLives()
      handleBullets()
      handleBoss()
      spawnBossBullet()
      handleBossBullets()
      handleBossBulletsCollisionWithBullets()
      spawnBossLasers()
      displayBossLife()

      if(bossLife <=0){
        if(!hasPlayedExplosion2){
          playerDestroySound.play()
          hasPlayedExplosion2 = true
          intenseMusic.setVolume(0)
          explosions = createSprite(boss.position.x, boss.position.y, 300, 300)
          explosions.scale = 3
          explosions.addAnimation("default", explosionAnimation)
          boss.velocity.y = 0
          bossBulletGroupLeft.removeSprites()
          bossBulletGroupRight.removeSprites()
          bossLaserGroup.removeSprites()
          bulletsGroup.removeSprites()
        }

        if(winStartTime === 0){
          winStartTime = millis()
        }
        if(millis() - winStartTime >= 2000){
          explosions.remove()
          gameState = WIN
          spaceShip.remove()
          boss.remove()
          bossBulletGroupLeft.removeSprites()
          bossBulletGroupRight.removeSprites()
          bossLaserGroup.removeSprites()
          bulletsGroup.removeSprites()

        }
      }
    }
    drawSprites()
  }

  //code for winning the game
  if(gameState === WIN){
    background(winBackground)
    newGameButton.show()
    newGameButton.mousePressed(newGame)
    fill("red")
    textSize(40)
    text("Your Score is " + score, width/2, 100)
    backgroundSound.setVolume(0)
    if(!hasPlayed3){
      winningSound.play()
      hasPlayed3 = true
    }
    intenseMusic.setVolume(0)
    drawSprites()
  }

  //Code for end Game
  if(gameState === END){
    background(losingBackgroundImage)
    newGameButton.show()
    newGameButton.mousePressed(newGame)
    backgroundSound.setVolume(0)
    
  }
}

function spaceShipMovement() {
  //Adding spaceShip movements
  spaceShip.velocity.y = 0;

  spaceShip.position.y = constrain(spaceShip.position.y, 20, height - 20)
  if (keyIsDown(UP_ARROW)) {
    spaceShip.velocity.y = -5;
  }
  if (keyIsDown(DOWN_ARROW) ) {
    spaceShip.velocity.y = 5;
  }
  // Code number for W and S on keyboard
  var w = 87
  var s = 83
  if (keyIsDown(w)) {
    spaceShip.velocity.y = -5;
  }
  if (keyIsDown(s) ) {
    spaceShip.velocity.y = 5;
  }

  //shoting bullets
  if(shootingAlligible){
  if (keyWentDown(32)) {
    shootBullet(spaceShip.position.x + 60, spaceShip.position.y ); 
    spaceShipSound.play()
  }
}
  else {
    fill("red")
    textSize(40)
    text("Press SPACE to shoot", width/2, height/2)
    text("Use UP and DOWN arrow keys to move", width/2, height/2 - 30)
}
}

function displaylevel1Text() {
  //Dispalying level1Text
  level1Text.visible = true;
  
  setTimeout(function () {
    level1Text.visible = false;
    level1TextVisible = false;
    spaceShip.visible = true
  }, 2000);
}

function displaylevel2Text(){
  level2Text.visible = true;
  setTimeout(function(){
    level2Text.visible = false;
    level2Textvisible = false;
    spaceShip.visible = true;
    level2Warning = true;
  }, 2000)
}

function displaylevel3Text(){
  level3Text.visible = true;
  setTimeout(function(){
    level3Text.visible = false;
    level3TextVisible = false;
    spaceShip.visible = true;
    
  }, 2000)
}

function startGame() {
  //Starting game function
  if (!buttonClicked) {
    gameState = level1;
    buttonClicked = true;
    console.log("Game State: " + gameState);
    startButton.hide();
    title.hide();

    level1TextVisible = true;

    
  }
}

function shootBullet(x,y){
  //Creating the bullets and calling in spaceShipMovement function()
  var bullet = createSprite(x,y,10,5)
  bullet.addImage(spaceShipBulletImage)
  bullet.scale = 0.1
  bullet.velocity.x = 10
  bulletsGroup.add(bullet)
}

function handleBullets() {
  //If the bullets get outside of the canvas it will be delted
  for (var i = bulletsGroup.length - 1; i >= 0; i--) {
    var bullet = bulletsGroup[i];
    if (bullet.position.x > width) {
      bullet.remove();
    }
  }
}

function spawnEnemy(){
  //Spawning the enemies
  if (enemies <=11 && frameCount % 30 === 0) {
    whooshSound.play()
    whooshSound.rate(2.0)
    var yPosition = enmeySpawnPosition[enemyGroup.length]
    var enemy = createSprite(width, yPosition, 20, 20);
    enemy.addImage(enemyImage);
    enemy.scale = 0.5;
    enemy.velocity.x = -12;
    enemyGroup.add(enemy);

    enemies +=1
    if(enemies === 12){
      shootingAlligible = true
    }
  }

  if (enemies <= 4) {
    for (var i = 0; i < enemyGroup.length; i++) {
      var enemyw = enemyGroup[i];
      if (enemyw.position.x < width - 350) {
        enemyw.velocity.x = 0;
      }
    }
  } else if(enemies > 4 && enemies <=8) {
    for (var i = 0; i < enemyGroup.length; i++) {
      var enemyw = enemyGroup[i];
      if (enemyw.position.x < width - 230) {
        enemyw.velocity.x = 0;
      }
    }
  } else {
    for (var i = 0; i < enemyGroup.length; i++) {
      var enemyw = enemyGroup[i];
      if (enemyw.position.x < width - 100) {
        enemyw.velocity.x = 0;
      }
    }
  }
  
}

function handleMeteoriteCollision(){
  for(var i = bulletsGroup.length -1; i >=0; i--){
    var bullet = bulletsGroup[i]
    for(var j = meteoriteGroup.length-1 ; j >=0; j--){
      var meteorite = meteoriteGroup[j]
      if(bullet.overlap(meteorite)){
        bullet.remove()
        meteorite.remove()
        score +=1
        explosionSound.play()
  
      }
    }
  }
}

function handleBulletCollision(){
  //Controlling the overlaping of bullets
  for(var i = bulletsGroup.length - 1; i >= 0; i--){
    var bullet = bulletsGroup[i]

    for(var j = enemyGroup.length-1; j >= 0; j--){
      var enemy = enemyGroup[j]

      if(bullet.overlap(enemy)){
        score +=1
        bullet.remove()
        enemy.remove()
        enemyDestroySound.play()
        enemyDestroySound.setVolume(2)
      }
    }

    for(var k = enemyBulletGroup.length -1; k>=0;k--){
      var enemyBullet = enemyBulletGroup[k]
      if(bullet.overlap(enemyBullet)){
        enemyBullet.remove()
        bullet.remove()
        impactSound.play()
        impactSound.setVolume(0.1)
      }
    }
  }
}

function handleEnemyBullets(){
  //Handling enemy bullets
  for (var i = 0; i < enemyGroup.length; i++) {
    var enemy = enemyGroup[i];
    if(enemies >= 11){
    if (frameCount % 200 === 0) { 
      var bullet = createSprite(enemy.position.x, enemy.position.y, 5, 5);
      bullet.addImage(enemyBulletImage);
      bullet.scale = 0.1;
      bullet.velocity.x = -9; 
      bullet.setCollider("circle", 0, 0, 200)
      enemyBulletGroup.add(bullet);
      enemyBulletSound.play()
    }
  }
    for (var j = enemyBulletGroup.length - 1; j >= 0; j--) {
      var enemybullet = enemyBulletGroup[j];

      if (enemybullet.overlap(spaceShip)) {
        life -=1
        damageSound.play()
        enemybullet.remove();


        
      }
      if (enemybullet.position.x < 0) {
        enemybullet.remove();
      }
    }
  }
}

function displayLives(){
  //Dipslay the hearts on top right of the screen
  if(life === 3){
    image(heartImage, 0, 0, 50, 70);
    image(heartImage, 55, 0, 50, 70);
    image(heartImage, 110, 0, 50, 70);
  }else if(life === 2){
    image(heartImage, 0, 0, 50, 70);
    image(heartImage, 55, 0, 50, 70);
  }else if(life === 1){
    image(heartImage, 0, 0, 50, 70);
  }
  fill("red")
  textSize(40)
  text("Score: " + score, 250,30)
}

function newGame(){
  location.reload()
}

function spawnMeteorites(){
  setTimeout(function(){
    if(frameCount % 30 === 0 && meteor <= 40){
      
      yPosition = random(height)
      var meteorite = createSprite(width, yPosition, 50,50)
      meteorite.scale = 1
      meteorite.velocity.x = -10
      meteorite.addAnimation("default", meteorAnimation)
      meteorite.setCollider("circle", 0, 0, 50)

      meteor +=1
      meteoriteGroup.add(meteorite)
      level2Warning = false
      
    }
    if(frameCount % 50 === 0 && meteor <=30){
      meteorSwooshSound.play()
      meteorSwooshSound.rate(1.5)
      meteorSwooshSound.setVolume(0.2)
    }
  }, 2000)

  //If meteorite overlpas spacehip the -1 life 
  for(var i = meteoriteGroup.length -1; i >=0; i--){
    var meteorite = meteoriteGroup[i]
    if(meteorite.overlap(spaceShip)){
      meteorite.remove()
      life -=1
      damageSound.play()
    }
  }
}

function handleMeteorites() {
  for (var i = meteoriteGroup.length - 1; i >= 0; i--) {
    var meteorite = meteoriteGroup[i];
    if (meteorite.position.x < 0) {
      meteorite.remove();
      score +=1
    }
   
  }
}

function handleBoss(){
  boss.visible = true
  boss.velocity.x = -2
  level3Warning = true;
  if (boss.position.x < width - 300) {
    boss.velocity.x = 0;
    level3Warning = false;
    movementAlligable = true;

    // checking if boss is allowed or not to move up and down
    if(bossDirection){
      boss.velocity.y = 2
    }
    
  }
  // Bouncing effect
  if (boss.position.y >= height - boss.height / 2) {
    boss.velocity.y = -2;
    bossDirection = false
  } else if (boss.position.y <= boss.height / 2) {
    boss.velocity.y = 2;
  }
}

function spawnBossBullet() {
  if (boss.position.x < width - 300 && frameCount % 140 === 0 && bulletPhase) {
    bossBulletSound.play()
    for (var i = 0; i < 3; i++) {
      var bossBullet = createSprite(boss.position.x, boss.position.y - 60, 20, 20);
      bossBullet.addImage(bossBulletImage);
      bossBullet.velocity.x = -6;
      bossBullet.velocity.y = random(-5, 5)
      bossBulletGroupRight.add(bossBullet)
    }
    for (var i = 0; i < 3; i++) {
      var bossBullet = createSprite(boss.position.x, boss.position.y + 60, 20, 20);
      bossBullet.addImage(bossBulletImage);
      bossBullet.velocity.x = -6;
      bossBullet.velocity.y = random(-5, 5)
      bossBulletGroupLeft.add(bossBullet)
    }
  }
}

function handleBossBullets(){
  for(var i = bossBulletGroupRight.length - 1; i >=0; i--){
    var bullet = bossBulletGroupRight[i]
    if(bullet.position.x <= 0){
      bullet.remove()
      bulletPhase = false
    }
    if(bullet.overlap(spaceShip)){
      life -=1
      damageSound.play()
      bullet.remove()
    }
  }
  for(var i = bossBulletGroupLeft.length - 1; i >=0; i--){
    var bullet = bossBulletGroupLeft[i]
    if(bullet.position.x <= 0){
      bullet.remove()
    }
    if(bullet.overlap(spaceShip)){
      life -=1
      damageSound.play()
      bullet.remove()
    }
  }
}

function handleBossBulletsCollisionWithBullets(){
  for(var i = bulletsGroup.length - 1; i >=0; i--){
    var bullet = bulletsGroup[i]
    for(var j = bossBulletGroupRight.length -1; j>=0; j--){
      var bossBullet = bossBulletGroupRight[j]
      if(bullet.overlap(bossBullet)){
        bossBullet.remove()
        bullet.remove()
        impactSound.play()
        impactSound.setVolume(0.1)
      }
    }
    for(var j = bossBulletGroupLeft.length -1; j>=0; j--){
      var bossBullet = bossBulletGroupLeft[j]
      if(bullet.overlap(bossBullet)){
        bossBullet.remove()
        bullet.remove()
        impactSound.play()
        impactSound.setVolume(0.1)
      }
    }
    if(bullet.overlap(boss)){
      bossLife -=2
      score +=1
      bullet.remove()
      impactSound.play()
      impactSound.setVolume(0.1)
    }
  }
}

function spawnBossLasers() {
  if (boss.position.x < width - 300 && frameCount % 220 === 0 && !bulletPhase) {
    var laser = createSprite(boss.position.x - 500, boss.position.y, 100, 400);
    laser.addImage(bossLaserImage);
    laser.setCollider("rectangle", 0, 0, 800, 50);
    bossLaserGroup.add(laser);
    laserSound.play()
    //removing the laser after a second
    setTimeout(function(){
      laser.remove()
      laserCollision = false
      bulletPhase = true
    }, 1000)

  }

  // Update the laser's position to match the boss's y-position
  bossLaserGroup.forEach(function (laser) {
    laser.position.y = boss.position.y;
  });
  //decarse life
  bossLaserGroup.forEach(function (laser) {
    if(spaceShip.overlap(laser)){
      if(!laserCollision){
        life -=1
        laserCollision = true
        damageSound.play()
      }
      
    }
  });
}

function displayBossLife(){
  if(bossLife === 100){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 120, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 80, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 40, height- 50, 40, 40)
    image(bossLifeImage, width/2  , height- 50, 40, 40)
    image(bossLifeImage, width/2 + 40, height- 50, 40, 40)
    image(bossLifeImage, width/2 + 80, height- 50, 40, 40)
    image(bossLifeImage, width/2 + 120, height- 50, 40, 40)
    image(bossLifeImage, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 100 && bossLife >= 90){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 120, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 80, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 40, height- 50, 40, 40)
    image(bossLifeImage, width/2  , height- 50, 40, 40)
    image(bossLifeImage, width/2 + 40, height- 50, 40, 40)
    image(bossLifeImage, width/2 + 80, height- 50, 40, 40)
    image(bossLifeImage, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 90 && bossLife >=80){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 120, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 80, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 40, height- 50, 40, 40)
    image(bossLifeImage, width/2  , height- 50, 40, 40)
    image(bossLifeImage, width/2 + 40, height- 50, 40, 40)
    image(bossLifeImage, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 80 && bossLife >=70){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 120, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 80, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 40, height- 50, 40, 40)
    image(bossLifeImage, width/2  , height- 50, 40, 40)
    image(bossLifeImage, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 70 && bossLife >=60){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 120, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 80, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 40, height- 50, 40, 40)
    image(bossLifeImage, width/2  , height- 50, 40, 40)
    image(emptyLife, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 60 && bossLife >=50){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 120, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 80, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 40, height- 50, 40, 40)
    image(emptyLife, width/2  , height- 50, 40, 40)
    image(emptyLife, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 50 && bossLife >=40){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 120, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 80, height- 50, 40, 40)
    image(emptyLife, width/2 - 40, height- 50, 40, 40)
    image(emptyLife, width/2  , height- 50, 40, 40)
    image(emptyLife, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 40 && bossLife >=30){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 120, height- 50, 40, 40)
    image(emptyLife, width/2 - 80, height- 50, 40, 40)
    image(emptyLife, width/2 - 40, height- 50, 40, 40)
    image(emptyLife, width/2  , height- 50, 40, 40)
    image(emptyLife, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 30 && bossLife >=20){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(bossLifeImage, width/2 - 160, height- 50, 40, 40)
    image(emptyLife, width/2 - 120, height- 50, 40, 40)
    image(emptyLife, width/2 - 80, height- 50, 40, 40)
    image(emptyLife, width/2 - 40, height- 50, 40, 40)
    image(emptyLife, width/2  , height- 50, 40, 40)
    image(emptyLife, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 20 && bossLife >=10){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(emptyLife, width/2 - 160, height- 50, 40, 40)
    image(emptyLife, width/2 - 120, height- 50, 40, 40)
    image(emptyLife, width/2 - 80, height- 50, 40, 40)
    image(emptyLife, width/2 - 40, height- 50, 40, 40)
    image(emptyLife, width/2  , height- 50, 40, 40)
    image(emptyLife, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife < 10 && bossLife >=0){
    image(bossLifeImage, width/2 - 200, height- 50, 40, 40)
    image(emptyLife, width/2 - 160, height- 50, 40, 40)
    image(emptyLife, width/2 - 120, height- 50, 40, 40)
    image(emptyLife, width/2 - 80, height- 50, 40, 40)
    image(emptyLife, width/2 - 40, height- 50, 40, 40)
    image(emptyLife, width/2  , height- 50, 40, 40)
    image(emptyLife, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }else if(bossLife <= 0){
    image(emptyLife, width/2 - 200, height- 50, 40, 40)
    image(emptyLife, width/2 - 160, height- 50, 40, 40)
    image(emptyLife, width/2 - 120, height- 50, 40, 40)
    image(emptyLife, width/2 - 80, height- 50, 40, 40)
    image(emptyLife, width/2 - 40, height- 50, 40, 40)
    image(emptyLife, width/2  , height- 50, 40, 40)
    image(emptyLife, width/2 + 40, height- 50, 40, 40)
    image(emptyLife, width/2 + 80, height- 50, 40, 40)
    image(emptyLife, width/2 + 120, height- 50, 40, 40)
    image(emptyLife, width/2 + 160, height- 50, 40, 40)
  }
}







