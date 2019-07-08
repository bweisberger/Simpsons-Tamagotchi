class Tamagotchi{
  constructor(name){
    this.name = name;
    this.hunger = 0;
    this.boredom = 0;
    this.sleepiness = 0;
    this.age = 0;
    this.image = ''
  }

}
const game = {
  homer: '',
  $name: $('#name'),
  $age: $('#age'),
  $hunger: $('#hunger'),
  $sleepiness: $('#sleepiness'),
  $boredom: $('#boredom'),
  // $tamagotchiImg: $('#tamagotchi-img'),
  startGame: function(name){
    this.homer = new Tamagotchi(name);
    $leftHomer = $('#homer-left');
    $rightHomer = $('#homer-right');
    $leftHomer.hide();
    this.displayStats();
    this.startTimer();
  },
  startTimer: function(){
    let count = 0

    const timer = setInterval(function(){
      count++;
      // if(count > 2){
      //   $leftHomer.show();
      // }
      // if($leftHomer.position().left < 200){
      //   $leftHomer.hide();
      // } else {$leftHomer.show();}
      // if($rightHomer.position().left > 300){
      //   $rightHomer.hide();
      // } else {$rightHomer.show();}
      if (count % 2 == 0){
        game.homer.hunger++
      }
      if (count % 3 == 0){
        game.homer.boredom++
      }
      if (count % 4 == 0){
        game.homer.sleepiness++
      }
      if (count % 10 == 0){
        game.homer.age++
      }
      game.displayStats()
      if (game.homer.hunger == 10 || game.homer.boredom == 10 || game.homer.sleepiness == 10){
        console.log(`Game over, something reached 10.`)
        clearInterval(timer);
      }
    }, 1000);
  },
  displayStats: function(){
    $('#age').text(`${this.homer.age} hours free`);
    $('#name').text(`${this.homer.name} Simpson`);
    $('#hunger').text(`Hunger ${this.homer.hunger}`);
    $('#sleepiness').text(`Sleepiness ${this.homer.sleepiness}`);
    $('#boredom').text(`Boredom ${this.homer.boredom}`);

  },
  showGame: function(boolean){
    if (boolean) {
      $('#age').show();
      $('#name').show();
      $('#hunger').show();
      $('#sleepiness').show();
      $('#boredom').show();
      $('.button').show();
      $('.homer-land').show();
      $('body').css('background-image', 'url("images/living room adult swim.jpg")');
    } else {
      $('#age').hide();
      $('#name').hide();
      $('#hunger').hide();
      $('#sleepiness').hide();
      $('#boredom').hide();
      $('.button').hide();
      $('#homer-right').hide();
      $('body').css('background-image', 'url("images/simpsons house.png")');
    }
  },

}
//hungry button - adds to sleepiness, takes away from hunger
$('.hungry-button').click(function(e){
  if ($(e.target).attr('id') == 'hungry-button'){
    if (game.homer.hunger > 2){
    game.homer.hunger -= 1;
    game.homer.sleepiness++;
    }
  }
});
//bored button - adds to sleepiness, takes 2 from boredom
$('.bored-button').click(function(e){
  if ($(e.target).attr('id') == 'bored-button'){
    if (game.homer.boredom > 2){
    game.homer.boredom -= 2;
    game.homer.sleepiness++;
    }
  }
});
//sleep button decrements sleepiness by 3, increments hunger & boredom by 1
$('.sleepy-button').click(function(e){
  if ($(e.target).attr('id') == 'sleepy-button'){
    if (game.homer.sleepiness > 3){
    game.homer.sleepiness -= 3;
    game.homer.boredom++;
    }
    //check if method works
  }
});
//when the document is ready
$(document).ready(function(){
  //grab the input field
  const $input = $('#name-input');
  //if focused on, clear 'Enter a name'
  $input.focus(function(){
    if(this.value === 'Enter a name'){
      this.value = '';
    }
  });
  game.showGame(false);
  $('#name-button').click(function(e){
    const name = $('#name-input').val();
    // console.log(name);
    game.startGame(name);
    game.showGame(true);
    $('.input-div').hide()
    $input.val("");
  });

  $('#enter-name').submit( function(e){
    e.preventDefault();
    const name = $('#name-input').val();
    // console.log(name);
    game.startGame(name);
    game.showGame(true);
    $('.input-div').hide()
    $input.val("");
  });
});
