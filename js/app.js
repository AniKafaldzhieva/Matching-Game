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

const deck = document.querySelector('.deck');
let moves = document.querySelector('.moves');
const reset = document.querySelector('.restart')
let cards = [...document.querySelectorAll('.card')];
let matchedCards = deck.getElementsByClassName('match');
let stars = [...document.getElementsByClassName('fa fa-star')];
let timer = document.getElementById('timer');
let openCards = [];
let count = 0;
let starsCount = 0;
let seconds = 0;
let minutes = 0;
let time;

window.onload = startGame();

deck.addEventListener('click', openFunction);

function startGame() {
  cards = shuffle(cards);
  hideCards();
  stopTimer();
  setTimeout(hideCards, 3000);

  for (let card of cards) {
    card.classList.add('show', 'open', 'disabled');
    deck.appendChild(card);

  }
  for (star of stars) {
    star.className = 'fa fa-star';

  }
  count = 0;
  moves.innerHTML = count;
  reset.addEventListener('click', resetFunction);

}

function hideCards() {
  for (let card of cards) {
    card.classList.remove('show', 'open', 'match', 'disabled');

  }
}

function openFunction(e) {
  if (openCards.length > 1) {
    return;

  }

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
    count++;

    if (count === 1) {
      startTimer();
    }

  }
  if (matchedCards.length === 16) {
    endGame();

  }
  moves.innerHTML = count;
  rating(count);

}

function matchedPairs() {
  openCards[0].classList.add('match', 'disabled');
  openCards[0].classList.remove('show', 'open');
  openCards[1].classList.add('match', 'disabled');
  openCards[1].classList.remove('show', 'open');
  openCards = [];

}

function unmatchedPairs() {
  openCards[0].classList.add('nomatch');
  openCards[1].classList.add('nomatch');
  setTimeout(function() {
    openCards[0].classList.remove('show', 'open', 'nomatch', 'disabled');
    openCards[1].classList.remove('show', 'open', 'nomatch', 'disabled');
    openCards = [];
  }, 1000);

}

function startTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
    }
  }

  timer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  setTimer();

}

function setTimer() {
  time = setTimeout(startTimer, 1000);

}

function stopTimer() {
  clearTimeout(time);
  seconds = 0;
  minutes = 0;
  timer.textContent = "00:00";

}

function endGame() {
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

  document.querySelector('.modal-btn').onclick = function() {
    $("#wrapper").dialog("close");
    startGame();

  }

  document.querySelector('.finalMoves').innerHTML = count;
  document.querySelector('.finalStars').innerHTML = starsCount;
  document.querySelector('.finalTime').innerHTML = timer.innerHTML;

  reset.removeEventListener('click', resetFunction);
  clearTimeout(time);

}

function resetFunction() {
  openCards = [];
  startGame();

}

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
