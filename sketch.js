var backImg,dog,cage,happy_jerry,sad_jerry,tom_running;
var tom;
var scene;
var obstacleGroup;
var invisibleGround;
var gameState = "start"
function preload(){
  tom_running=loadAnimation("tom1.png","tom2.png","tom3.png","tom4.png")
  dog=loadImage("dog.png")
  cage=loadImage("cage.png")
  happy_jerry=loadImage("happyjerry.png")
  sad_jerry=loadImage("sadjerry.png")
  backImg=loadImage("background.png")

playImg=loadImage("play-button.png")
keyImg=loadImage("key.png")
restartImg=loadImage("restart.png")
gameoverImg=loadImage("gameover.png")
}



    
function setup() {
  createCanvas(1600,900);

  scene=createSprite(0,0,1600,900);
  scene.addImage(backImg);
  scene.scale=5.0;

  tom=createSprite(200,550,20,50);
  tom.addAnimation("running",tom_running);
  tom.scale=0.6;
  tom.debug = true;
  tom.setCollider("rectangle",50,0,400,100)

  play=createSprite(800,600);
  play.addImage(playImg)
  play.scale=0.4

  gameover=createSprite(800,300)
  gameover.addImage(gameoverImg)
  gameover.scale=1.3

  restart=createSprite(800,650)
  restart.addImage(restartImg)
  restart.scale=0.5
  
  invisibleGround=createSprite(900,810,1700,10);
  invisibleGround.visible=false;
 

  obstacleGroup=createGroup()
  keyGroup=createGroup()

  life=3
  
  count=0
}

function draw() {
  background("pink"); 
  drawSprites();

  fill("black")
  textSize(25)
  text("life = "+life,100,50)
  text("keys = "+count,1450,50)

if(gameState==="start"){
  textSize(80)
  fill("red")
  textAlign(CENTER)
  text("tom and jerry",800,230)

  tom.visible=false
  play.visible=true
  gameover.visible=false
  restart.visible=false
  scene.velocityX=0;

 if(mousePressedOver(play)){
   gameState="play"
 }

}

  
  if(gameState==="play") {


    
    gameover.visible=false
    restart.visible=false

    play.visible=false
    tom.visible=true
     
    if(scene.x<0){
          scene.x=scene.width/2;
        }
        scene.velocityX=-5;
        spawnObstacles();
        keys();

       
        if(keyDown("space") && tom.y>630){
          tom.velocityY=-33
        }
        //gravity
        tom.velocityY+=1
        //tom stop falling 
       
        
        if(obstacleGroup.isTouching(tom)){
       //gameState="end"
          life=life-1
          obstacleGroup.destroyEach();
          console.log("life"+life)
        }

        if (life===0){
          gameState="end";

        }

        if(tom.isTouching(keyGroup)){
          count+= 1
          keyGroup[0].destroy()

        }

       

  }
  
    if(gameState==="end"){
      scene.velocityX=0
      tom.velocityY=0
      play.visible=false
      tom.visible=false
      gameover.visible=true
      restart.visible=true
      obstacleGroup.setVelocityXEach(0)
      obstacleGroup.setLifetimeEach(-1)
      keyGroup.setVelocityXEach(0)
      keyGroup.setLifetimeEach(-1)

      if(mousePressedOver(restart)){
        console.log("restart the game")
        reset()
      }
      
    }


tom.collide(invisibleGround)
  
  
}








function spawnObstacles(){
  if(frameCount%250===0){
    var obstacle=createSprite(1600,730,20,50);
    obstacle.addImage(dog);
    obstacle.velocityX=-6;
    obstacle.lifetime=270;
    obstacle.debug=false;
    obstacle.setCollider("circle",0,0,100)

    obstacle.scale=0.7

    obstacleGroup.add(obstacle)
  }
}

function keys(){
  if(frameCount%150===0){
    var key = createSprite(1600,random(300,500),10,10);
    key.addImage(keyImg);
    key.velocityX=-6;
    key.lifetime=200;
    

    key.scale=0.4
    keyGroup.add(key)

  }
}
function reset(){
  gameState="play"
  obstacleGroup.destroyEach()
  keyGroup.destroyEach()
  console.log("restart the game")
  life=3
}
