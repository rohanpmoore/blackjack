const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

const suits = ["clubs", "diamonds", "hearts", "spades"];

const deckSize = 52;

function Card(name, imageSrc) {
  this.name = name;
  this.imageSrc = imageSrc;
}

var getRandomCard = function(deck) {
  return deck.splice(Math.floor(Math.random()*deck.length), 1)[0];
}

var returnToDeck = function(deck, card) {
  deck.push(card);
}
var showImage = function(src) {
  var img = document.createElement("img");
  img.src = src;
  img.width = 200;
  img.height = 300;
  img.alt = "card";
  document.body.appendChild(img);
}

$(document).ready(function() {
  var deck = [];
  var cardNames = [];
  var images = [];
  for (i = 1; i <= 52; i++) {
    images.push("img/card" + i + ".png");
  }
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      cardNames.push(rank + " of " + suit);
    });
  });
  for (i = 0; i < 52; i++) {
    deck.push(new Card(cardNames[i], images[i]));
  }
  // showImage("img/test.jpg");
  $("#deal").click(function() {
    var hand = [];
    for (i = 0; i < 7; i++) {
      hand.push(getRandomCard(deck));
    }
    hand.forEach(function(card) {
      $("#card-list").append("<li>" + card.name + "</li>")
      showImage(card.imageSrc)
      returnToDeck(deck, card);
    });
  });
});
