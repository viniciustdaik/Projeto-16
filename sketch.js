//Estados de Jogo
var PLAY=1;
var END=0;
var gameState=1;

var scene, snowball,fruit ,monster,fruitGroup, fruitGroup2, fruitGroup3, monsterGroup, score,r,randomFruit, position;
var backgroundimg, knifeImage ,snowballImage,snowballfriend,snowballfriend2, snowballfriend3, snowballenemy, 
fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;

var weaponimg1;
var weaponimg2;
var isPlaying = false;

function preload(){
  snowballfriend3 = loadImage("snowballfriend3.png");
  snowballfriend2 = loadImage("snowballfriend2.png");
  snowballImage = loadAnimation("snowball.png");//, "snowballanm1.png",
  //"snowballanm2.png", "snowballanm3.png");
  snowballfriend = loadAnimation("snowballfriend.png");//, "snowballfriendanm1.png",
  //"snowballfriendanm2.png", "snowballfriendanm3.png");
  snowballenemy = loadAnimation("snowballenemy.png");//, "snowballenemyanm1.png", 
  //"snowballenemyanm2.png", "snowballenemyanm3.png");
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("fimdeJogo.png");
  weaponimg1 = loadImage("katana.png");
  weaponimg2 = loadImage("espada.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
  backgroundimg = loadImage("background.png");
}



function setup() {
  createCanvas(600, 600);
  scene = createSprite(300, 300);
  scene.visible = false;
  //scene.scale = 0.1;
  //scene.addImage("background", backgroundimg);
  //criando espada
  snowball=createSprite(300,300,20,20);
  snowball.addAnimation("snowball", snowballImage);
  
  snowball.scale=3;
  
  
  
  //definir colisor para espada
  //knife.setCollider("rectangle",0,0,40,40);
  snowball.setCollider("circle", 0, 0, 0,);
  //snowball.debug=true;

  //Variáveis de pontuação e Grupos
  score=0;
  fruitGroup=createGroup();
  fruitGroup2 = createGroup();
  fruitGroup3 = createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  /*if(keyDown('1')){
    knife.addImage("knife", knifeImage);
    knife.changeImage("knife", knifeImage);
    knife.scale=0.7
    knife.setCollider("rectangle", 0, 0, 45, 120, 30);
  }
  if(keyDown('2')){
    knife.addImage("lança", weaponimg1);
    knife.changeImage("lança", weaponimg1);
    knife.scale=0.2
    knife.setCollider("rectangle", -25, -100, 45, 450, -20);
  }
  if(keyDown('3')){
    knife.addImage("espada", weaponimg2);
    knife.changeImage("espada", weaponimg2);
    knife.scale=0.2
    knife.setCollider("rectangle", 45, -40, 100, 350, 50);
  }*/
  if(keyDown("space")&&isPlaying==false){
    isPlaying = true;
  }
  if(isPlaying == false){
    fill('cyan');
    textSize(20);
    text("Pegue as bolas de neve Amigas e desvie das Inimigas.", 30, 80);
    text("Pressione A Barra De Espaço Para Começar!", 30, 130);
  }
  if(gameState===PLAY&&isPlaying==true){
    scene.addImage("background", backgroundimg);
    scene.scale = 0.1;
    scene.visible = true;
    //Chamar função de frutas e função de monstro
    fruits();
    fruits2();
    fruits3();
    Monster();
    
    //mover espada com o mouse
    snowball.y=World.mouseY;
    snowball.x=World.mouseX;
  
    //Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(snowball)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+2;
      
    }
    if(fruitGroup2.isTouching(snowball)){
      fruitGroup2.destroyEach();
      knifeSwooshSound.play();
      score=score+6;
      
    }
    if(fruitGroup3.isTouching(snowball)){
      fruitGroup3.destroyEach();
      knifeSwooshSound.play();
      score=score+10;
      
    }
    else
    {
      //Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(snowball)){
        gameState=END;
        //som de fim de jogo/gameover
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        //Mude a animação da espada para fim de jogo e redefina sua posição
        snowball.addImage("gameover", gameOverImage);
        snowball.changeImage("gameover", gameOverImage)
        snowball.scale=1;
        snowball.x=300;
        snowball.y=300;
      }
    }
  }
  
  drawSprites();
  //exibir pontuação
  textSize(25);
  fill('gold');
  text("Pontuação: "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("enemy", snowballenemy);
    monster.scale=3;
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    //monster.setCollider("circle", 0, 0, 0,);
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0
  //aumentar a velocidade das frutas após a pontuação 4 
    fruit.velocityX= (7+(score/4));
    fruit.scale=0.2;
    //fruit.debug=true;
    fruit.addAnimation("friend", snowballfriend);
    fruit.scale = 3;
    r=Math.round(random(1,4));
    /*if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }*/
    
    fruit.y=Math.round(random(50,550));
   
    //fruit.setCollider("circle", 0, 0, 0,);
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
function fruits2(){
  if(World.frameCount%580===0){
    var fruit2=createSprite(400,200,20,20);
    fruit2.x = 0
  //aumentar a velocidade das frutas após a pontuação 4 
    fruit2.velocityX= (7+(score/4));
    fruit2.scale=0.2;
    //fruit2.debug=true;
    fruit2.addImage("friend", snowballfriend2);
    fruit2.scale = 3;
    r=Math.round(random(1,4));
    /*if (r == 1) {
      fruit2.addImage(fruit1);
    } else if (r == 2) {
      fruit2.addImage(fruit2);
    } else if (r == 3) {
      fruit2.addImage(fruit3);
    } else {
      fruit2.addImage(fruit4);
    }*/
    
    fruit2.y=Math.round(random(50,550));
   
    //fruit2.setCollider("circle", 0, 0, 0,);
    fruit2.setLifetime=100;
    
    fruitGroup2.add(fruit2);
  }
}
function fruits3(){
  if(World.frameCount%780===0){
    var fruit3=createSprite(400,200,20,20);
    fruit3.x = 0
  //aumentar a velocidade das frutas após a pontuação 4 
    fruit3.velocityX= (7+(score/4));
    fruit3.scale=0.2;
    //fruit3.debug=true;
    fruit3.addImage("friend", snowballfriend3);
    fruit3.scale = 3;
    r=Math.round(random(1,4));
    /*if (r == 1) {
      fruit3.addImage(fruit1);
    } else if (r == 2) {
      fruit3.addImage(fruit2);
    } else if (r == 3) {
      fruit3.addImage(fruit3);
    } else {
      fruit3.addImage(fruit4);
    }*/
    
    fruit3.y=Math.round(random(50,550));
   
    //fruit3.setCollider("circle", 0, 0, 0,);
    fruit3.setLifetime=100;
    
    fruitGroup3.add(fruit3);
  }
}
