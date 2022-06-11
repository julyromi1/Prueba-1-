/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var japon;
var verano;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver
//restart;

function preload(){
  parrot1_running = loadAnimation("Pirate parrot1.png","Pirate parrot2.png");
  parrot1_collided = loadAnimation("crash1.png","Pirate parrot.png","Pirate parrot0");
  background1 = loadImage("Japón1.jfif");
  background2 = loadImage("Verano.jpg");
  background3= loadImage("otoño1.jpg");
  background4= loadImage("invierno.jpg");
  background5= loadImage("parque.png");
  gameOverImg = loadImage("game over.png");
  //restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("jump.wav");
  collidedSound = loadSound("collided.wav");
  troll_collided = loadAnimation("Dancing troll4.png","Dancing troll2.png","Dancing troll1.png");
}

function setup() {
  createCanvas(800, 400);

  japon = createSprite(900,300,400,20);
  japon.addImage("japon",background1);
  japon.scale=0.3
  japon.x = width /2;

  verano = createSprite(900,300,400,20);
  verano.addImage("verano",background2);
  verano.scale=0.3
  verano.x = width /2;


  parrot1 = createSprite(50,200,20,50);
  parrot1.addAnimation("running", parrot1_running);
  parrot1.addAnimation("collided", parrot1_collided);
  parrot1.scale = 0.15;
  parrot1.setCollider("circle",0,0,300)
    
  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  //restart = createSprite(550,140);
  //restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  //restart.scale = 0.1;

  gameOver.visible = false;
  //restart.visible = false;
  
  
  //shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  
  parrot1.x=camera.position.x-270;
   
  if (gameState===PLAY){

    japon.velocityX=-3
  }

    if(japon.x<100)
    {
       verano.x=400
    }
   console.log(kangaroo.y)
    if(keyDown("space")&& parrot1.y>270) {
      jumpSound.play();
      parrot1.velocityY = -16;
    }
  
    parrot1.velocityY = parrot1.velocityY + 0.8
    //spawnShrubs();
    //spawnObstacles();

    parrot1.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(parrot1)){
      collidedSound.play();
      gameState = END;
    }
    
    
    /*if(shrubsGroup.isTouching(kangaroo)){
      score = score + 1;
      shrubsGroup.destroyEach();
    }
  }*/
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    //restart.x=camera.position.x;
    gameOver.visible = true;
    //restart.visible = true;
    parrot1.velocityY = 0;
    japon.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    //shrubsGroup.setVelocityXEach(0);

    parrot1.changeAnimation("collided",parrot1_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    //shrubsGroup.setLifetimeEach(-1);
    
    /*if(mousePressedOver(restart)) {
        reset();
    }
  }*/

  if (gameState === WIN) {
    japon.velocityX = 0;
    parrot1.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    //shrubsGroup.setVelocityXEach(0);

    parrot1.changeAnimation("collided",parrot1_collided);

    obstaclesGroup.setLifetimeEach(-1);
    //shrubsGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Puntuación: "+ score, camera.position.x,50);
  
  if(score >= 5){
    kangaroo.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("¡Felicidades! ¡Ganaste el juego! ", 70,200);
    gameState = WIN;
  }
  }

function spawnShrubs() {
 
  if (frameCount % 150 === 0) {

    var shrub = createSprite(camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
       
    shrub.scale = 0.05;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addAnimation(troll_collided);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;      

    obstacle.lifetime = 400;
    obstaclesGroup.add();
    
  }
}

/*function reset(){
  gameState = PLAY;
  gameOver.visible = true;
  restart.visible = true;
  kangaroo.visible = true;
  kangaroo.changeAnimation("running",
                kangaroo_running);
  obstaclesGroup.Each();
  shrubsGroup.destroyEach();
  score = 0;
}*/

/*function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  kangaroo.visible = true;
  kangaroo.changeAnimation("running",
               kangaroo_running);
  obstaclesGroup.destroyEach();
  shrubsGroup.destroyEach();

}*/

/*function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  kangaroo.visible = false;
  kangaroo.changeAnimation("running",
               kangaroo_running);
  obstaclesGroup.destroyeach();
  shrubsGroup.destroyeach();
  score = 0;
}*/

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  //restart.visible = false;
  parrot1.visible = true;
  parrot1.changeAnimation("running",
               parrot1_running);
  obstaclesGroup.destroyEach();
  //shrubsGroup.destroyEach();
  score = 0;
}
}