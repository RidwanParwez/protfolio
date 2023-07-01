// You can add JavaScript functionality to your website here if needed
// Game constants
const CANVAS_BORDER_COLOR = '#000';
const CANVAS_BACKGROUND_COLOR = '#fff';
const SNAKE_COLOR = '#00f';
const FOOD_COLOR = '#f00';
const SNAKE_SIZE = 20;
const FOOD_SIZE = 20;
const INITIAL_SPEED = 200;

// Game variables
let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 }
];
let food = { x: 0, y: 0 };
let dx = SNAKE_SIZE;
let dy = 0;
let score = 0;
let changingDirection = false;
let gamePaused = false;
let gameInterval;

// Get the canvas element
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');

// Set up keyboard controls
document.addEventListener('keydown', changeDirection);

// Start the game
startGame();

// Functions

function startGame() {
  // Reset game variables
  snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
  ];
  dx = SNAKE_SIZE;
  dy = 0;
  score = 0;
  changingDirection = false;
  gamePaused = false;

  // Generate initial food location
  generateFood();

  // Clear canvas
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Start game interval
  gameInterval = setInterval(draw, INITIAL_SPEED);
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = SNAKE_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;
  ctx.fillRect(snakePart.x, snakePart.y, SNAKE_SIZE, SNAKE_SIZE);
  ctx.strokeRect(snakePart.x, snakePart.y, SNAKE_SIZE, SNAKE_SIZE);
}

function drawFood() {
  ctx.fillStyle = FOOD_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;
  ctx.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);
  ctx.strokeRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  const hasEatenFood = snake[0].x === food.x && snake[0].y === food.y;
  if (hasEatenFood) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  if (changingDirection) return;

  changingDirection = true;

  const keyPressed = event.keyCode;
  const going
