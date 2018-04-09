/*
 * Create a list that holds all of your cards
 */
//let cards = ["fa-diamond", "fa-paper-plane", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle",
// "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane", "fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Get all document elements
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const reset = document.querySelector('.restart')
let cards = [...document.querySelectorAll('.card')];
let matchedCards = deck.getElementsByClassName('match');
let stars = [...document.getElementsByClassName('fa fa-star')];
let timer = document.getElementById('timer');
// An array for the open cards
let openCards = [];
// A counter for the moves and stars
let movesCount = 0;
let starsCount = 0;
// Variables for the timer
let seconds = 0;
let minutes = 0;
let time;

// Star a new game when the page is refreshed/loaded
window.onload = startGame();

// Display a card when is clicked
deck.addEventListener('click', displayCards);

// A function to star a new game
function startGame() {
  cards = shuffle(cards);
  hideCards();
  stopTimer();

// Starts the timer when a card is clicked
  [...deck.children].forEach((card) => {
      card.addEventListener('click', startTimer);
  })

// Hide all cards after 3 seconds
  setTimeout(hideCards, 3000);

  for (let card of cards) {
    card.classList.add('show', 'open', 'disabled');
    deck.appendChild(card);

  }
  for (star of stars) {
    star.className = 'fa fa-star';

  }
  movesCount = 0;
  moves.innerHTML = movesCount;

  // Reset the game when the button is clicked
  reset.addEventListener('click', resetGame);

}

// A function that hide all cards from the deck
function hideCards() {
  for (let card of cards) {
    card.classList.remove('show', 'open', 'match', 'disabled');

  }
}

// A function that display a card
function displayCards(e) {
// Prevent from adding more cards in the array
  if (openCards.length > 1) {
    return;

  }

// When the click target is a card, opens it and pushes it in the array
  if (e.target.nodeName == 'LI') {
    e.target.classList.add('open', 'show', 'disabled');
    openCards.push(e.target);

  }

  if (openCards.length === 2) {
    if (openCards[0].innerHTML == openCards[1].innerHTML) {
      matchedPairs();

    } else {
      unmatchedPairs();

    }
    movesCount++;

  }
  if (matchedCards.length === 16) {
    endGame();

  }
  moves.innerHTML = movesCount;
  rating(movesCount);

}

// A function for a matched pair of cards
function matchedPairs() {
  openCards[0].classList.add('match', 'disabled');
  openCards[0].classList.remove('show', 'open');
  openCards[1].classList.add('match', 'disabled');
  openCards[1].classList.remove('show', 'open');
  openCards = [];

}

// A function for an unmatched pair of cards
function unmatchedPairs() {
  openCards[0].classList.add('nomatch');
  openCards[1].classList.add('nomatch');
  setTimeout(function() {
    openCards[0].classList.remove('show', 'open', 'nomatch', 'disabled');
    openCards[1].classList.remove('show', 'open', 'nomatch', 'disabled');
    openCards = [];
  }, 1000);

}

// A function for starting a timer
function startTimer() {
// Remove the event listener from all cards
  [...deck.children].forEach((card) => {
       card.removeEventListener('click', startTimer);
   })

  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
    }
  }

  //timer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");
  
  timer.textContent = minutes + ":" + seconds;

  setTimer();

}

// A function for calling the timer after 1 second
function setTimer() {
  time = setTimeout(startTimer, 1000);

}

// A function for stopping and clearing the timer
function stopTimer() {
  clearTimeout(time);
  seconds = 0;
  minutes = 0;
  timer.textContent = "00:00";

}

// A function for ending game
function endGame() {
// Shows the div element as a dialog
  $(function() {
    $("#wrapper").dialog({
      autoOpen: false,
      dialogClass: 'no-close',
      draggable: false,
      titlebar: false
    });
    $("#wrapper").dialog("open");
    $("#wrapper").corner();
    $('#wrapper').position({of: $('.container')});
  })

// Restarts the game and closes the dialog when the button is clicked
  document.querySelector('.modal-btn').onclick = function() {
    $("#wrapper").dialog("close");
    startGame();

  }

// Display the final time, moves and stars
  document.querySelector('.finalMoves').innerHTML = movesCount;
  document.querySelector('.finalStars').innerHTML = starsCount;
  document.querySelector('.finalTime').innerHTML = timer.innerHTML;

  reset.removeEventListener('click', resetGame);
  clearTimeout(time);

}

// A function for resetting the game
function resetGame() {
  openCards = [];
  startGame();

}

// A function for the rating
function rating(counter) {
  if (counter < 10) {
    starsCount = 3;

  } else if (counter > 10 && counter < 20) {
    stars[2].className = 'fa fa-star-o';
    starsCount = 2;

  } else if (counter > 20) {
    stars[1].className += 'fa fa-star-o';
    starsCount = 1;

  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
