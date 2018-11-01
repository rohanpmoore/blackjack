const RANKS = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

const SUITS = ["clubs", "diamonds", "hearts", "spades"];

const DECK_SIZE = 52;

function Deck() {
  this.cards = makeCards();
}

function Card(name, imageSrc) {
  this.name = name;
  this.imageSrc = imageSrc;
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

}

Hand.prototype.addCard = function(card) {
  (this.hand).push(card);
}

Hand.prototype.clearHand = function() {
  return (this.hand).splice(0, (this.hand).length);
}

Hand.prototype.displayHand = function() {
  (this.hand).forEach(function(card) {
    $("#card-list").append("<li>" + card.name + "</li>")
    showImage(card.imageSrc);
  });
}

Deck.prototype.getRandomCard = function() {
   return (this.cards).splice(Math.floor(Math.random()*52), 1)[0];
}

Deck.prototype.returnToDeck = function(cards) {
  cards.forEach(function(card) {
    (this.cards).push(card);
  });
}

var showImage = function(src) {
  var img = document.createElement("img");
  img.src = src;
  img.width = 200;
  img.height = 300;
  img.alt = "card";
  $("#cardImages").append(img);
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
    output.push(new Card(cardNames[i], images[i]))
  }
  return output;
}

$(document).ready(function() {

});
