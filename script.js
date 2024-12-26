let coins = 100;
let currentLevel = 1;
const totalLevels = 100;
const levelsStatus = Array(totalLevels).fill(false);

const puzzles = [
  { question: "What has keys but can’t open locks?", answer: "piano" },
  { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "candle" },
];

const quizzes = [
  { question: "What is the capital of France?", answer: "paris" },
  { question: "2 + 2 = ?", answer: "4" },
];

const riddles = [
  { question: "What has to be broken before you can use it?", answer: "egg" },
  { question: "The more of this there is, the less you see. What is it?", answer: "darkness" },
];

// Screen navigation
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToHome() {
  showScreen('home-screen');
}

function openShop() {
  updateShop();
  showScreen('shop-screen');
}

function openLevels() {
  populateLevels();
  showScreen('levels-screen');
}

function startGame() {
  loadLevel(currentLevel);
}

function goToLevels() {
  showScreen('levels-screen');
}

// Shop functionality
function updateShop() {
  const shopItems = [
    { name: 'Background 1', price: 50 },
    { name: 'Background 2', price: 100 },
    { name: 'Background 3', price: 150 },
  ];

  const shopItemsContainer = document.getElementById('shop-items');
  shopItemsContainer.innerHTML = '';

  shopItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'shop-item';
    div.innerHTML = `
      <p>${item.name}</p>
      <p>Price: ${item.price} coins</p>
      <button onclick="buyItem(${index})">Buy</button>
    `;
    shopItemsContainer.appendChild(div);
  });

  document.getElementById('coins-display').innerText = `Coins: ${coins}`;
}

function buyItem(index) {
  const prices = [50, 100, 150];
  if (coins >= prices[index]) {
    coins -= prices[index];
    alert('Item purchased!');
    updateShop();
  } else {
    alert('Not enough coins!');
  }
}

// Levels functionality
function populateLevels() {
  const levelsGrid = document.getElementById('levels-grid');
  levelsGrid.innerHTML = '';

  for (let i = 1; i <= totalLevels; i++) {
    const button = document.createElement('div');
    button.className = `level-button ${levelsStatus[i - 1] ? 'completed' : 'incomplete'}`;
    button.innerText = `Level ${i}`;
    button.onclick = () => loadLevel(i);
    levelsGrid.appendChild(button);
  }
}

// Gameplay functionality
function loadLevel(level) {
  currentLevel = level;

  const levelData = randomizeLevel();
  document.getElementById('level-title').innerText = `Level ${level}`;
  document.getElementById('question').innerText = levelData.question;
  document.getElementById('answer-input').value = '';

  showScreen('game-screen');
}

function randomizeLevel() {
  const randomType = Math.random();
  if (randomType < 0.33) {
    return puzzles[Math.floor(Math.random() * puzzles.length)];
  } else if (randomType < 0.66) {
    return quizzes[Math.floor(Math.random() * quizzes.length)];
  } else {
    return riddles[Math.floor(Math.random() * riddles.length)];
  }
}

function submitAnswer() {
  const answerInput = document.getElementById('answer-input');
  const correctAnswer = randomizeLevel().answer;

  if (answerInput.value.toLowerCase() === correctAnswer) {
    alert('Correct!');
    levelsStatus[currentLevel - 1] = true;
    coins += 10;
    goToLevels();
  } else {
    alert('Incorrect, try again!');
  }
}

// Exit functionality
function exitGame() {
  alert('Thank you for playing!');
}
