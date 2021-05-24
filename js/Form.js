class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title= createElement('h2')
    this.reset=createButton("RESET")
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
   
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2,displayHeight/15);

    this.input.position(displayWidth/2,displayHeight/5);
    this.button.position(displayWidth/2,displayHeight/4);
    this.reset.position(displayWidth-100,100)

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2,displayHeight/5);
    });
    
    this.reset.mousePressed(()=>{
      game.update(0)
      player.updateCount(0)
      database.ref("/").update({
        CarsAtEnd:0
      })
    })

  }
}