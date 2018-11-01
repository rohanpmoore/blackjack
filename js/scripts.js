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
  (this.playerHand).displayHand();
  (this.AIHand).displayPartialHand();
}

Game.prototype.endRound = function() {
  (this.deck).returnToDeck((this.playerHand).clearHand());
  (this.deck).returnToDeck((this.AIHand).clearHand());
}

Hand.prototype.addCards = function(cards) {
  for(var i = 0; i < cards.length; i++) {
    (this.hand).push(cards[i]);
  }
}

Hand.prototype.clearHand = function() {
  return (this.hand).splice(0, (this.hand).length);
}

Hand.prototype.displayHand = function() {
  (this.hand).forEach(function(card) {
    $("#playerHandList").append("<li>" + card.name + "</li>")
    showImage(card.imageSrc, "player");
  });
}

Hand.prototype.getValue = function() {

}

Hand.prototype.displayPartialHand = function() {
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
  img.width = 200;
  img.height = 300;
  img.alt = "card";
  $("#" + target + "Hand").append(img);
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
  $("#deal").click(function() {
    $("#card-list").html("");
    $("#cardImages").html("");
    game.deal();
    game.endRound();
  })
  $("#hitButton").click(function() {
    (game.playerHand).addCards(1);
  })
});
