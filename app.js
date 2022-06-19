let computerMove;
let playerChoice;
let roundResult;
let roundNumber = 0;
let playerPoints = 0;
let computerPoints = 0;
let isPreviousRound = false;

const paper = document.getElementById("paper");
const rock = document.getElementById("rock");
const scissors = document.getElementById("scissors");
const gameBoard = document.querySelector(".gameBoard");
const playerScore = document.querySelector(".playerScore");
const computerScore = document.querySelector(".computerScore");
const numberOfGames = document.querySelector(".numberOfGames");
const btns = document.querySelectorAll(".btn");
const endResult = document.getElementById('endResult')

const computerPlay = () => {
  const number = Math.floor(Math.random() * 3) + 1;
  switch (number) {
    case 1:
      computerMove = "paper";
      break;
    case 2:
      computerMove = "rock";
      break;
    case 3:
      computerMove = "scissors";
      break;
    default:
      break;
  }
  const newDiv = document.createElement("div");
  newDiv.innerText = `Computer plays ${computerMove}`;
  newDiv.className = "computerMov";
  gameBoard.appendChild(newDiv);
};

const playRound = (computerMove, playerChoice) => {
  switch (computerMove) {
    case "paper":
      if (playerChoice === "paper") {
        roundResult = "It's a tie.";
      } else if (playerChoice === "rock") {
        roundResult = "You lose, paper beats rock.";
        computerPoints++;
      } else {
        roundResult = "You win, scissors beat paper.";
        playerPoints++;
      }
      break;
    case "rock":
      if (playerChoice === "paper") {
        roundResult = "You win, paper beats rock.";
        playerPoints++;
      } else if (playerChoice === "rock") {
        roundResult = "It's a tie";
      } else {
        roundResult = "You lose, rock beats scissors.";
        computerPoints++;
      }
      break;
    case "scissors":
      if (playerChoice === "paper") {
        roundResult = "You lose, scissors beat paper.";
        computerPoints++;
      } else if (playerChoice === "rock") {
        roundResult = "You win, rock beats scissors.";
        playerPoints++;
      } else {
        roundResult = "It's a tie.";
      }
      break;
    default:
      break;
  }
  roundNumber++;
  const newDiv = document.createElement("div");
  newDiv.innerText = roundResult;
  newDiv.className = "result";
  gameBoard.appendChild(newDiv);
  playerScore.innerText = playerPoints;
  computerScore.innerText = computerPoints;
  numberOfGames.innerText = roundNumber;
};

const game = (playerMovement) => {
  if (isPreviousRound) {
    gameBoard.innerHTML = "";
    isPreviousRound = !isPreviousRound;
  }
  gameStart(playerMovement);
  computerPlay();
  playRound(computerMove, playerChoice);
  isPreviousRound = !isPreviousRound;
  if (roundNumber === 5) {
    end()
  }
};

const gameStart = (playerMovement) => {
  const newDiv = document.createElement("div");
  playerChoice = playerMovement;
  newDiv.innerText = `You played ${playerChoice}`;
  newDiv.className = "playerMov";
  gameBoard.appendChild(newDiv);
};

const end = () => {
  btns.forEach((btn) => {
    btn.disabled = true;
    btn.className = 'btn-disabled'
  });
  if(playerPoints > computerPoints) {
    endResult.innerText = 'You win!'
  } else if (playerPoints < computerPoints) {
    endResult.innerText = 'Computer wins!'
  } else {
    endResult.innerText = 'It\'s a tie.'
  }
}

paper.addEventListener("click", () => {
  game("paper");
});
rock.addEventListener("click", () => {
  game("rock");
});
scissors.addEventListener("click", () => {
  game("scissors");
});
