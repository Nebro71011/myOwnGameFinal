var jumper,ground,bgImg,plank,cowboy,bulletImg;
var START=0;
var PLAY=1;
var END=2;
var gameState=START;
var blockGroup,bulletGroup;
var score=0;

function preload(){
     bgImg=loadImage("bg.jpg");
     plank=loadImage("plank.png");
     cowboy=loadImage("cowboy.png");
     bulletImg=loadImage("bullet.png");
}

 function setup(){
    createCanvas(700,600);

     jumper=createSprite(350,300,30,30);
     jumper.addImage(cowboy);
     jumper.setCollider("rectangle",-10,0,180,200);
     jumper.scale=0.3;
     blockGroup=new Group();
     bulletGroup=new Group();
 }

 function draw(){
     background(bgImg);
     if(gameState===START){
          
         textSize(24);
         fill("black");
         text("Press space to start",250,200);
          
         if(keyDown("space")){
             gameState=PLAY;
         }
          
     }
     if(gameState===PLAY){
        spawnBlocks();

        textSize(18);
        fill("black");
        text("Score:"+score,300,20);

        if(keyDown(RIGHT_ARROW)){
            jumper.x=jumper.x+4;
        }    
        if(keyDown(LEFT_ARROW)){
            jumper.x=jumper.x-4;
        }
        if(keyDown("space")){
            jumper.velocityY=-13;
        }

        jumper.velocityY=jumper.velocityY+0.8;

        if(blockGroup.isTouching(jumper)){
            jumper.collide(blockGroup);
            gameState=PLAY;
          }
          
        if(bulletGroup.isTouching(jumper)){
            score=score+10;
            bulletGroup.destroyEach();
        }

        if(jumper.y>=630){
            gameState=END;
        }

        score++;
     }

     drawSprites();

     if(gameState===END){
         background(bgImg);
         textSize(24);
         fill("blue");
         text("GAME OVER",300,200);
         fill("green");
         text("Press R to restart",280,250);

         if(keyDown("r")){
            gameState=START;
            jumper.x=350;
            jumper.y=300;
            jumper.velocityY=0;
            score=0;
            blockGroup.destroyEach();
            bulletGroup.destroyEach();
         }
     }
 }

 function spawnBlocks() {
     //spawn blocks
     if (frameCount % 130 === 0) {
      var xPosition=Math.round(random(160,600));
      var jumpBlock = createSprite(xPosition,0,0,0);
      jumpBlock.addImage(plank);    
      jumpBlock.setCollider("rectangle",0,0,500,90)
      jumpBlock.velocityY = 3;
      jumpBlock.scale=0.3;
      jumpBlock.lifetime = 210;   
      blockGroup.add(jumpBlock);
      //spawn bullets
      var bullet=createSprite(xPosition,-30,0,0);
      bullet.addImage(bulletImg);
      bullet.scale=0.1; 
      bullet.velocityY = 3;
      bulletGroup.add(bullet);
    }
    
  }
