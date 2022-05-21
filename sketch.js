var theif, coins, new_coins, background,coinsGroup;
var theifImage, coinsImage, backgroundImage;
var score=0;
var coinsGroup;
var bottomEdge, topEdge;
var coinsSound;
var rocks, rocksImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var canvas;


function preload()
{
  //images Loaded
  
  theifImage=loadImage("thief.png");
  coinsImage=loadImage("coin.png");
  backgroundImage=loadImage("bg.jpeg");
  rocksImage=loadImage("rock.png");
}

function setup()
{
  canvas = createCanvas(displayWidth-10,displayHeight-10);
  
    //background
    background = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
    background.addImage(backgroundImage);
    background.scale = 4.3
    background.velocityX=-8
  
    //theif sprite
    theif=createSprite(40,200,20,20)
    theif.addImage(theifImage);
    theif.scale=0.25;
  
   coinsGroup=new Group();
   //coins.scale=0.25;
   rocksGroup= new Group();
  
   bottomEdge= createSprite(0,330,300,10);
   topEdge= createSprite(0,35,300,10);
}

function draw()
{
  if(gameState===PLAY){
  if(background.x<0){
    background.x=background.width/2
  } 
  
  if(keyDown("up")){
    theif.velocityY=-4
  }
  
  if(keyDown("down")){
    theif.velocityY=4
  }
  
  spawnCoins();
  spawnRocks();
  
  theif.setCollider("circle",0,0,20)
  
  if(theif.isTouching(coinsGroup))
    {
      coinsGroup.destroyEach();
      score=score+1
    }
  
    
    bottomEdge.visible=false;
    theif.bounceOff(bottomEdge);
  
    topEdge.visible=false;
    theif.bounceOff(topEdge);
  
  
    
      if(theif.isTouching(rocksGroup)){
     rocksGroup.destroyEach();
        theif.velocityY=0;
     restart();
        gameState = END;
      }
  
  }
    
  drawSprites();
    
    if(gameState === END)
     {   
     score=0;
     textSize(30);
     fill("white")  
     text("Gameover",110,150)  
     textSize(30); 
     text("Press Enter to Restart", 90,190) 
    }

  textSize(20);
  fill("black")
  text("Score:"+score,320,30);
}

function spawnCoins() {
  //producing coins
  if (frameCount % 120 === 0) {
    coins = createSprite(600,100,40,10);
    coins.addImage(coinsImage)
    coins.y = Math.round(random(40,300))
    coins.scale = 0.1
    coins.velocityX =-(8+(score/15));
    
    
    //assigning lifetime to the variable
    coins.lifetime = 200
    
    //adjust the depth
    coins.depth = theif.depth
    theif.depth = theif.depth + 1;
    coinsGroup.add(coins)
    }
}



function spawnRocks(){
  if(frameCount%180===0){
    rocks=createSprite(600,100,20,20)
    rocks.addImage(rocksImage)
    rocks.y=Math.round(random(40,360))
    rocks.velocityX=-(8+(score/15))
    rocks.scale=0.5
    
    rocks.lifetime = 200
    
    rocks.depth = theif.depth
    theif.depth = theif.depth + 1;
    rocksGroup.add(rocks)
  }
}

function restart(){
  score=0;
  coinsGroup.destroyEach();
  rocksGroup.destroyEach();
  gameState=END;
  theif.velocityY=0;
  background.velocityX=0;
}
