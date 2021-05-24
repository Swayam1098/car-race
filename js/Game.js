class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1=createSprite(100,200)
    car1.addImage(car1Img)
    car2=createSprite(300,200)
    car2.addImage(car2Img)
    car2.scale=0.4
    car3=createSprite(500,200)
    car3.addImage(car3Img)
    car3.scale=0.5
    car4=createSprite(700,200)
    car4.addImage(car4Img)
    car4.scale=0.7
    cars=[car1,car2,car3,car4]
  }

  play(){
    
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(groundImg)
      image(track1,0,-displayHeight*4,displayWidth,displayHeight*5)
     // var display_position = 130;
     var index=0
     var x=200
     var y
      for(var plr in allPlayers){
        index=index+1
        x=x+250
        y=displayHeight-allPlayers[plr].distance
        cars[index-1].x=x
        cars[index-1].y=y
        if (index ===   player.index){
          stroke(10)
          fill("red")
          ellipse(x,y,60,60)
          cars[index-1].shapeColor="red"
          camera.position.x=displayWidth/2
          camera.position.y=cars[index-1].y
        }
        

        textSize(25);
        textAlign(CENTER)
        text(allPlayers[plr].name, cars[index-1].x,cars[index-1].y+75)
      }
      drawSprites()
    }
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>4500){
      gameState=2
      player.rank=player.rank+1
      Player.updateCarsAtEnd(player.rank)
    }
  }
  end(){
    console.log("GameEnded")
    console.log(player.rank)
  }
}
