document.addEventListener('DOMContentLoaded', () => {

  //card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('#grid')
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
  let currentScore = 0;
  let timer = null;
  let timeRemaining = 60;
  let gameOver = false;
  let gameStarted = false;
  const gameOverModal = document.getElementById('gameOverModal');
  const victoryModal = document.getElementById('victoryModal');
  const finalScoreElement = document.getElementById('finalScore');
  const finalScoreVictoryElement = document.getElementById('finalScoreVictory');
  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/brain.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/brain.png')
      cards[optionTwoId].setAttribute('src', 'images/brain.png')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      currentScore++;
      scoreElement.textContent = 'Score: ' + currentScore;
    } else {
      cards[optionOneId].setAttribute('src', 'images/brain.png')
      cards[optionTwoId].setAttribute('src', 'images/brain.png')
    }
    cardsChosen = []
    cardsChosenId = []
    scoreElement.textContent = 'Score: ' + cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timer);
      showVictoryModal();
    } else if (timeRemaining <= 0) {
      clearInterval(timer);
      showGameOverModal();
    }
   
  }

  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }
    function showGameOverModal() {
      finalScoreElement.textContent = currentScore;
      gameOverModal.style.display = 'block';
      const closeButton = document.getElementsByClassName('close')[0];
              closeButton.addEventListener('click', function() {
                gameOverModal.style.display = 'none';
              });
    }
    function showVictoryModal() {
      finalScoreVictoryElement.textContent = currentScore;
      victoryModal.style.display = 'block';
      const closeButton = document.getElementsByClassName('close')[1];
              closeButton.addEventListener('click', function() {
                  victoryModal.style.display = 'none';
              });
              gameOver = true;
              resetGame()
      
    }
  function updateTimer() {
    timeRemaining--;
    timerElement.textContent = 'Time: ' + timeRemaining;

    if (timeRemaining <= 0 && !gameOver) {
      clearInterval(timer);
      showGameOverModal();
      gameOver = true;
    }
  }

  function startTimer() {
    timer = setInterval(updateTimer, 1000);
  }

  // Inicia o jogo
  function startGame() {
  }

  function resetGame() {
    clearInterval(timer);
    timeRemaining = 60;
    timerElement.textContent = 'Time: ' + timeRemaining;
    grid.innerHTML = '';
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    currentScore = 0;
    scoreElement.textContent = 'Score: ' + currentScore;
    createBoard();
  }

  const startButton = document.getElementById('start-btn');
  startButton.addEventListener('click', () => {
    startGame();
    startTimer();
  });

  const resetButton = document.getElementById('reset-btn');
  resetButton.addEventListener('click', resetGame);
  createBoard();

  document.addEventListener('DOMContentLoaded', startGame());
})

// status
