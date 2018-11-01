const RANKS = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

const SUITS = ["clubs", "diamonds", "hearts", "spades"];

const DECK_SIZE = 52;

const INITIAL_HAND_SIZE = 2;

function Deck() {
  this.cards = makeCards();
}

function Card(name, imageSrc, value) {
  this.name = name;
  this.imageSrc = imageSrc;
  this.value = value;
}

function Hand(owner) {
  this.hand = [];
  this.owner = owner;
}

function Game(playerOneName) {
  this.playerHand = new Hand(playerOneName);
  this.AIHand = new Hand("House");
  this.deck = new Deck();
}

Game.prototype.deal = function() {
  (this.playerHand).addCards((this.deck).getCards(INITIAL_HAND_SIZE));
  (this.AIHand).addCards((this.deck).getCards(INITIAL_HAND_SIZE));
}

Game.prototype.endRound = function() {
  (this.deck).returnToDeck((this.playerHand).clearHand());
  (this.deck).returnToDeck((this.AIHand).clearHand());
}

Game.prototype.stay = function() {
  while((this.AIHand).getValue() < 17) {
    var bust = (this.AIHand).addCards((this.deck).getCards(1));
    if(bust) {
      (this.AIHand).displayHand("house");
      $("#results").text("The dealer went bust!  You win!");
      return;
    }
  }
  this.AIHand.displayHand("house");
  if((this.AIHand).getValue() > (this.playerHand).getValue()) {
    $("#results").text("The dealer beat you!  Sucks to be you!");
  } else if ((this.AIHand).getValue() < (this.playerHand).getValue()) {
    $("#results").text("You beat the house!  Nice job!");
  } else {
    $("#results").text("It's a draw!  Try again!");
  }
}

Hand.prototype.addCards = function(cards) {
  for(var i = 0; i < cards.length; i++) {
    (this.hand).push(cards[i]);
  }
  if(this.owner != "House") {
    this.displayHand("player");
  } else {
    this.displayPartialHand();
  }
  return this.isOver21();
}

Hand.prototype.clearHand = function() {
  return (this.hand).splice(0, (this.hand).length);
}

Hand.prototype.displayHand = function(target) {
  $("#" + target + "HandImg").html("");
  $("#" + target + "HandList").html("");
  (this.hand).forEach(function(card) {
    $("#" + target + "HandList").append("<li>" + card.name + "</li>")
    showImage(card.imageSrc, target);
  });
}

Hand.prototype.getValue = function() {
  var value = 0;
  for(var i = 0; i < (this.hand).length; i++) {
    value += (this.hand)[i].value;
  }
  return value;
}

Hand.prototype.isOver21 = function() {
  if(this.getValue() > 21) {
    return true;
  }
  return false;
}

Hand.prototype.displayPartialHand = function() {
  $("#houseHandList").html("");
  $("#houseHandImg").html("");
  $("#houseHandList").append("<li>Unknown Card</li>");
  showImage("img/back.jpg", "house");
  for(var i = 1; i < (this.hand).length; i++) {
    var card = this.hand[i]
    $("#houseHandList").append("<li>" + card.name + "</li>");
    showImage(card.imageSrc, "house");
  }
}

Deck.prototype.getCards = function(handSize) {
  var hand = [];
  for(var i = 0; i < handSize; i++) {
    hand.push((this.cards).splice(Math.floor(Math.random()*(this.cards).length), 1)[0]);
  }
  return hand;
}

Deck.prototype.returnToDeck = function(cards) {
  for(var i = 0; i < cards.length; i++) {
    (this.cards).push(cards[i]);
  }
}

var showImage = function(src, target) {
  var img = document.createElement("img");
  img.src = src;
  img.width = 150;
  img.height = 225;
  img.alt = "card";
  $("#" + target + "HandImg").append(img);
}

function makeCards() {
  var cardNames = [];
  var images = [];
  var output = [];
  for (i = 1; i <= DECK_SIZE; i++) {
    images.push("img/card" + i + ".png");
  }
  SUITS.forEach(function(suit) {
    RANKS.forEach(function(rank) {
      cardNames.push(rank + " of " + suit);
    });
  });
  for(i = 0; i < DECK_SIZE; i++) {
    output.push(new Card(cardNames[i], images[i], Math.min(10, (i % 13) + 1)))
  }
  console.log(output);
  return output;
}

$(document).ready(function() {
  var game = new Game("test");
  var gameOver = false;
  $("#deal").click(function() {
    game.endRound();
    gameOver = false;
    $("#hitButton").removeClass("disabled");
    $("#stayButton").removeClass("disabled");
    $("#results").text("");
    $("#houseHandImg").html("");
    $("#houseHandList").html("");
    $("#playerHandImg").html("");
    $("#playerHandList").html("");
    $("#gameBoard").show();
    $("#hitButton").show();
    $("#stayButton").show();
    $("#deal").text("Play another round?");
    game.deal();
  })
  $("#hitButton").click(function() {
    if(!gameOver) {
      var bust = (game.playerHand).addCards((game.deck).getCards(1));
      if(bust) {
        $("#results").text("Sorry bub!  You went bust!");
        game.AIHand.displayHand("house");
        gameOver = true;
        $("#hitButton").addClass("disabled");
        $("#stayButton").addClass("disabled");
      }
    }
  })
  $("#stayButton").click(function() {
    if(!gameOver) {
      gameOver = true;
      $("#hitButton").addClass("disabled");
      $("#stayButton").addClass("disabled");
      game.stay();
    }
  })
});
