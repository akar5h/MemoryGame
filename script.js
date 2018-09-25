// Code goes here

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;



function flipcard(){

  if(lockBoard) return;
  if(this===firstCard) return;

  this.classList.add('flip');


  if(!hasFlippedCard){
    //first click
    hasFlippedCard = true;
    firstCard =this;
    return;
  }
  //second click
  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();

}


function checkForMatch(){
  if(firstCard.dataset.framework === secondCard.dataset.framework){
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards(){
  firstCard.removeEventListener('click',flipcard);
  secondCard.removeEventListener('click',flipcard);

  resetBoard();
}

function unflipCards(){
  lockBoard =true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random()*12);
    card.style.order = randomPos;
  });
})();
cards.forEach(card => card.addEventListener('click',flipcard));
