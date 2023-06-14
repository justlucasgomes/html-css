
```
const boardSize = 500;
const squareSize = 20;
const initialSnakeLength = 3;
let snake = [];
let direction = 'Right';
let score = 0;
let food = null;

const board = document.getElementById('board');
board.style.width = boardSize + 'px';
board.style.height = boardSize + 'px';

for (let i = 0; i < initialSnakeLength; i++) {
  snake.push([i, 0]);
}

function drawBoard() {
  board.innerHTML = '';
  snake.forEach(([x, y]) => {
    const snakeSquare = document.createElement('div');
    snakeSquare.className = 'snake';
    snakeSquare.style.left = x * squareSize + 'px';
    snakeSquare.style.top = y * squareSize + 'px';
    board.appendChild(snakeSquare);
  });
  
  if (food) {
    const [x, y] = food;
    const foodSquare = document.createElement('div');
    foodSquare.className = 'food';
    foodSquare.style.left = x * squareSize + 'px';
    foodSquare.style.top = y * squareSize + 'px';
    board.appendChild(foodSquare);
  }
}

function updateSnake() {
  const [headX, headY] = snake[snake.length - 1];
  let newHead = [headX, headY];
  
  switch (direction) {
    case 'Up':
      newHead = [headX, headY - 1];
      break;
    case 'Down':
      newHead = [headX, headY + 1];
      break;
    case 'Left':
      newHead = [headX - 1, headY];
      break;
    case 'Right':
      newHead = [headX + 1, headY];
      break;
  }
  
  if (newHead[0] < 0 || newHead[0] >= boardSize / squareSize ||
      newHead[1] < 0 || newHead[1] >= boardSize / squareSize ||
      snake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
    endGame();
    return;
  }
  
  snake.push(newHead);
  
  if (newHead[0] === food[0] && newHead[1] === food[1]) {
    score++;
    food = generateFood();
  } else {
    snake.shift();
  }
}

function generateFood() {
  let newFood = null;

  while (newFood === null || snake.some(([x, y]) => x === newFood[0] && y === newFood[1])) {
    const x = Math.floor(Math.random() * (boardSize / squareSize));
    const y = Math.floor(Math.random() * (boardSize / squareSize));

    newFood = [x, y];
  }

  return newFood;
}

function updateScore() {
  const scoreDiv = document.getElementById('score');
  scoreDiv.innerHTML = 'Score: ' + score;
}

function endGame() {
  alert('Game over!\nYour score: ' + score);
  direction = 'Right';
  snake = [];
  score = 0;
  food = null;

  for (let i = 0; i < initialSnakeLength; i++) {
    snake.push([i, 0]);
  }
}

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      if (direction !== 'Down') direction = 'Up';
      break;
    case 'ArrowDown':
      if (direction !== 'Up') direction = 'Down';
      break;
    case 'ArrowLeft':
      if (direction !== 'Right') direction = 'Left';
      break;
    case 'ArrowRight':
      if (direction !== 'Left') direction = 'Right';
      break;
  }
});

function gameLoop() {
  updateSnake();
  updateScore();
  drawBoard();
  setTimeout(gameLoop, 100);
}

food = generateFood();
drawBoard();
updateScore();
gameLoop();
```