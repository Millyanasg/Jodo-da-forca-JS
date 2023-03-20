window.onload = function () {
  let wordsArray = [
    ['C', 'A', 'F', 'E'],
    ['M', 'O', 'U', 'S', 'E'],
    ['J', 'A', 'V', 'A', 'S', 'C', 'R', 'I', 'P', 'T'],
    ['F', 'A', 'L', 'E', 'C', 'E', 'R'],
    ['U', 'N', 'D', 'E', 'F', 'I', 'N', 'E', 'D'],
    ['P', 'Y', 'T', 'H', 'O', 'N'],
    ['M', 'A', 'R', 'K', 'D', 'O', 'W', 'N'],
    ['P', 'I', 'T', 'A', 'N', 'G', 'A'],
  ];
  let categoryArray = [
    ['Um bom programador não vive sem...'],
    ['Eu e você temos, sua mãe provavelmente chama de baratinha..'],
    ['Linguagem usada no Front End...'],
    ['Quando seu código não copila a sua vontade...'],
    ['Quando você declara o valor incorretamente...'],
    ['Linguagem usada no Back End...'],
    ['Linguagem de marcação de texto...'],
    ['Nome de uma fruta...'],
  ];

  let newGame = document.getElementById('newGame');
  newGame.onclick = startNewGame;

  function gameOver() {
    timer.innerHTML = 'GAME OVER HAHAHA';
  }

  class Hangman {
    constructor() {
      this.random = Math.floor(Math.random() * wordsArray.length);
      this.wordToGuess = wordsArray[this.random];
      this.category = categoryArray[this.random];
      this.placeholderArray = Array(this.wordToGuess.length).fill('_');
      this.guessed = [];
      this.lives = 6;
    }

    setupNewWord() {
      let guessWrapper = document.getElementById('guessWrapper');
      let placeholderP = document.createElement('p');
      let category = document.getElementById('categoryName');
      category.innerHTML = this.category;

      placeholderP.setAttribute('id', 'placeholderP');
      placeholderP.innerHTML = this.placeholderArray.join('');
      guessWrapper.appendChild(placeholderP);

      let userLetter = document.getElementById('userLetter');
      userLetter.onkeypress = this.handleKeyPress.bind(this);

      let guessButton = document.getElementById('guessButton');
      guessButton.onclick = this.handleClick.bind(this);
    }
    handleClick() {
      let userLetterInput = document.getElementById('userLetter');
      let userLetter = userLetterInput.value.toUpperCase();
      let placeholderP = document.getElementById('placeholderP');
      let warningText = document.getElementById('warningText');
      let alreadyGuessed = document.querySelector('#alreadyGuessed span');
      let wrongLetters = document.querySelector('#wrongLetters span');
      let leftLives = document.querySelector('#leftLives span');

      if (!/[a-zA-Z]/.test(userLetter)) {
        unhideElements('hidden', warningText);
        warningText.innerHTML = 'Por favor somente letras de A-Z sem acentos';
      } else {
        hideElements('hidden', warningText);

        if (
          this.wordToGuess.indexOf(userLetter) > -1 &&
          this.guessed.indexOf(userLetter) == -1
        ) {
          checkGuess(this.wordToGuess, userLetter);
          hideElements('hidden', warningText);
        } else if (
          this.wordToGuess.indexOf(userLetter) == -1 &&
          this.guessed.indexOf(userLetter) == -1
        ) {
          hideElements('hidden', warningText);
          unhideElements('hidden', wrongLetters.parentNode);
          wrongLetters.innerHTML += userLetter;
          this.lives--;
          hangerDraw(this.lives);
          hideLives(this.lives);
        } else {
          unhideElements('hidden', warningText);
          warningText.innerHTML = '';
          warningText.innerHTML += 'Already typed ' + userLetter;
        }
        this.guessed.indexOf(userLetter) == -1
          ? this.guessed.push(userLetter)
          : null;

        if (Array.from(placeholderP.innerHTML).indexOf('_') == -1) {
          gameOver(true);
        } else if (this.lives == 0) {
          gameOver();
        }
      }
      userLetterInput.value = '';
    }
    handleKeyPress(e) {
      var guessButton = document.getElementById('guessButton');
      if (e.keyCode === 13) {
        guessButton.click();
      }
    }
  }

  function checkGuess(wordToGuess, userLetter) {
    let placeholderP = document.getElementById('placeholderP');
    let placeholderArray = Array.from(placeholderP.innerHTML);
    placeholderArray = placeholderArray.map((el, i) => {
      if (wordToGuess[i] == userLetter) {
        return (el = userLetter);
      } else {
        return el;
      }
    });

    placeholderP.innerHTML = placeholderArray.join('');
  }

  function gameOver(win) {
    let winMessage = document.getElementById('statusMessage');
    let btnWrapper = document.querySelector('.button-wrapper');
    hideElements('hidden', btnWrapper);
    if (win) {
      winMessage.innerHTML = 'You Win';
      winMessage.style.color = 'green';
    } else {
      winMessage.innerHTML = 'Game Over';
      winMessage.style.color = 'rgb(239, 83, 80)';
    }
  }

  function hangerDraw(num) {
    let show = document.getElementById(`show${num}`);
    unhideElements('hidden', show);
  }

  function hideLives(num) {
    let life = document.getElementById(`life${num}`);
    hideElements('hiddenLife', life);
  }

  function hideElements(myclass, ...els) {
    for (let el of els) {
      el.classList.add(myclass);
    }
  }

  function unhideElements(myclass, ...els) {
    for (let el of els) {
      el.classList.remove(myclass);
    }
  }

  function startNewGame() {
    let btnWrapper = document.querySelector('.button-wrapper');
    let winMessage = document.getElementById('statusMessage');
    let wrongLetters = document.querySelector('#wrongLetters span');
    let warningText = document.querySelector('#warningText');
    let hiddenHangman = Array.from(document.querySelectorAll('svg .bodyPart'));
    let hiddenLives = Array.from(document.querySelectorAll('.lives'));

    for (let bodyPart of hiddenHangman) {
      hideElements('hidden', bodyPart);
    }

    for (let life of hiddenLives) {
      unhideElements('hiddenLife', life);
    }

    wrongLetters.innerHTML = '';
    unhideElements('hidden', btnWrapper);
    hideElements('hidden', wrongLetters.parentNode, warningText);
    winMessage.innerHTML = 'COMECE DENOVO';
    winMessage.style.color = 'black';
    let oldP = document.getElementById('placeholderP');
    if (oldP.parentNode) {
      oldP.parentNode.removeChild(oldP);
    }

    let startGame = new Hangman();
    startGame.setupNewWord();
  }

  let startGame = new Hangman();
  startGame.setupNewWord();
};
