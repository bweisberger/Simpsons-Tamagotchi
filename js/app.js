class Tamagotchi{
  constructor(name){
    this.name = name;
    this.hunger = 2;
    this.boredom = 2;
    this.sleepiness = 2;
    this.age = 0;
    this.image = 'images/homer butt scratch.gif'
  }

}
// let timeout;/
const game = {
  homer: '',
  $name: $('#name'),
  $age: $('#age'),
  $hunger: $('#hunger'),
  $sleepiness: $('#sleepiness'),
  $boredom: $('#boredom'),
  startGame: function(name){
    this.homer = new Tamagotchi(name);
    this.displayStats();
    this.startTimer();
  },
  startTimer: function(){
    let count = 0

    const timer = setInterval(function(){
      count++;

      if (count % 3 == 0){
        game.homer.hunger++
      }
      if (count % 4 == 0){
        game.homer.boredom++
      }
      if (count % 5 == 0){
        game.homer.sleepiness++
      }
      if (count % 9 == 0){
        game.homer.age++
      }
      game.displayStats()
      //transform homer at 60 seconds
      if (count == 36){
        $('#level-up-text').show();
        $('#homergotchi').css({'width': '50vw'});
        $('#homergotchi').attr('src', 'images/transforming homer.gif');
        setTimeout(function(){
          game.homer.image = 'images/spin on the floor homer.gif';
          $('#level-up-text').hide()
          $('#homergotchi').attr('src', 'images/spin on the floor homer.gif');
          $('#homergotchi').css({'top': '75%', 'left': '20%', 'width': '30vw'});
      }, 3000);
    }
      if (game.homer.hunger == 10 || game.homer.boredom == 10 || game.homer.sleepiness == 10){
        alert("Bummer. Something reached 10.")
        location.reload();
        clearInterval(timer);
      }
    }, 1000);
  },
  displayStats: function(){
    $('#age').text(`${this.homer.age} happy hours passed.`);
    $('#name').text(`${this.homer.name} Simpson`);
    $('#hunger').text(`Hunger ${this.homer.hunger}`);
    $('#sleepiness').text(`Sleepiness ${this.homer.sleepiness}`);
    $('#boredom').text(`Boredom ${this.homer.boredom}`);
  },
  showGame: function(boolean){
    if (boolean) {
      $('#background-music').attr('src','audio/Homer sings spanish flea (192  kbps).mp3')
      $('#age').show();
      $('#name').show();
      $('#hunger').show();
      $('#sleepiness').show();
      $('#boredom').show();
      $('.button').show();
      $('.homer-land').show();
      $('.title').hide();
      $('.prancing-homer-land').hide();
      $('.selection-clouds').hide();
      $('body').css('background-image', 'url("images/living room adult swim.jpg")');
    } else {
      $('#age').hide();
      $('#name').hide();
      $('#hunger').hide();
      $('#sleepiness').hide();
      $('#boredom').hide();
      $('.button').hide();
      $('.homer-land').hide();
      $('.input-div').hide();
      $('.prancing-homer-land').show();
      $('body').css('background-image', 'url("images/simpsons house.png")');
    }
  },

}
//hungry button - adds to sleepiness, takes away from hunger
$('.hungry-button').click(function(e){
  if ($('#homergotchi').attr('src')== 'images/sleeping homer.gif'){
    $('#homer-sleeping-text').show();
  }
  else if ($(e.target).attr('id') == 'hungry-button'){
    // clearTimeout(timeout)
    if (game.homer.hunger >= 2){
    game.homer.hunger -= 2;
    game.homer.sleepiness++;
    $('#donut-homer').show();
    $('#donut-audio')[0].play();
    setTimeout(function(){
      $('#donut-homer').hide();
    },2000)
    game.displayStats();
    }
  }
});
//bored button - adds to sleepiness, takes 2 from boredom
$('.bored-button').click(function(e){
  if ($('#homergotchi').attr('src')== 'images/sleeping homer.gif'){
    $('#homer-sleeping-text').show();
  }
  else if ($(e.target).attr('id') == 'bored-button'){
    // clearTimeout(timeout);
    if (game.homer.boredom >= 2){
    game.homer.boredom -= 2;
    game.homer.sleepiness++;
    $('#woohoo-homer').show();
    $('#woohoo-audio')[0].play();
    const timeout = setTimeout(function(){
      $('#woohoo-homer').hide();
    },2000)
    game.displayStats();
    }
  }
});
//sleep button decrements sleepiness by 5
$('.sleepy-button').click(function(e){
  if ($(e.target).attr('id') == 'sleepy-button'){
    if (game.homer.sleepiness >= 5){
    game.homer.sleepiness -= 5;
    game.displayStats();
    $('#homergotchi').attr('src', 'images/sleeping homer.gif');
    $('#homergotchi').css({'top': '50%', 'left':'28%'})
    $('#sleepy-audio')[0].play();
    const sleepTimer = setTimeout(function(){
      $('#sleepy-audio')[0].pause();
      $('#homer-sleeping-text').hide();
      $('#homergotchi').attr('src', game.homer.image);

      if (game.homer.image == 'images/homer butt scratch.gif'){
        $('#homergotchi').css({'top': '18%', 'left': '23%'})
      }
      else if (game.homer.image == 'images/spin on the floor homer.gif') {
        $('#homergotchi').css({'top': '75%', 'left': '20%', 'width': '30vw'});
      }
    }, 5000)
    }
    //check if method works
  }
});

$('.instructions-text').on('click', function(e){
  console.log(e.target, 'click worked')
  $('#instructions-modal').modal('toggle');
});

$('.start-game-text').on('click', function(){
  $('.input-div').show();
  $('.selection-clouds').hide();
});
//when the document is ready
$(document).ready(function(){
  // $('#simpsons-theme')[0].play();
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
    // $('#simpsons-theme')[0].pause();
    game.showGame(true);
    $('.input-div').hide()
    $input.val("");
  });

  $('#enter-name').submit( function(e){
    e.preventDefault();
    const name = $('#name-input').val();
    // console.log(name);
    game.startGame(name);
    // $('#simpsons-theme')[0].pause();
    game.showGame(true);
    $('.input-div').hide()
    $input.val("");
  });
});
