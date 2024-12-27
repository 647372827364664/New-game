// Global Variables
let coins = 500; // Starting coins
let purchasedBackgrounds = []; // Tracks purchased backgrounds
let currentBackground = 'assets/backgrounds/background1.jpg'; // Default background
let backgroundMusic = new Audio('assets/music/game-music.mp3'); // Background music
let buttonClickSound = new Audio('assets/sounds/button-click.mp3'); // Button click sound

// Initialize Game
document.addEventListener('DOMContentLoaded', () => {
  initializeGame();
  startBackgroundMusic();
});

// Initialize Game and Setup Event Listeners
function initializeGame() {
  // Check if user is logged in
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    document.getElementById('user-name').textContent = loggedInUser.username;
    showScreen('home-screen');
  } else {
    showScreen('login-screen');
  }

  // Set up event listeners for navigation and actions
  setupEventListeners();
}

// Show Specific Screen
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  // Update background dynamically based on the screen
  const screenBackgrounds = {
    'login-screen': 'assets/backgrounds/background1.jpg',
    'signup-screen': 'assets/backgrounds/background2.jpg',
    'home-screen': 'assets/backgrounds/background3.jpg',
    'shop-screen': 'assets/backgrounds/background1.jpg',
    'levels-screen': 'assets/backgrounds/background2.jpg',
    'settings-screen': 'assets/backgrounds/background3.jpg',
  };
  applyBackground(screenBackgrounds[screenId] || currentBackground);
}

// Apply Background to Body
function applyBackground(imageUrl) {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}

// Play Button Click Sound
function playButtonSound() {
  buttonClickSound.currentTime = 0;
  buttonClickSound.play();
}

// Login Functionality
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    document.getElementById('user-name').textContent = username;
    playButtonSound();
    alert(`Welcome back, ${username}!`);
    showScreen('home-screen');
  } else {
    alert('Invalid username or password!');
  }
}

// Signup Functionality
function signup() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!username || !password) {
    alert('Please enter a valid username and password!');
    return;
  }

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = storedUsers.some(user => user.username === username);

  if (userExists) {
    alert('Username already exists!');
    return;
  }

  storedUsers.push({ username, password, coins: 500 });
  localStorage.setItem('users', JSON.stringify(storedUsers));

  alert('Signup successful! You can now login.');
  showScreen('login-screen');
}

// Logout Functionality
function logout() {
  localStorage.removeItem('loggedInUser');
  playButtonSound();
  showScreen('login-screen');
}

// Shop Functions
function buyItem(itemType, price, backgroundImage) {
  if (coins >= price) {
    coins -= price;

    if (itemType === 'background') {
      if (!purchasedBackgrounds.includes(backgroundImage)) {
        purchasedBackgrounds.push(backgroundImage);
        alert('Background purchased!');
      } else {
        alert('You already own this background.');
      }
    } else if (itemType === 'hint') {
      alert('Hint purchased!');
    }

    updateCoinsDisplay();
  } else {
    alert('Not enough coins!');
  }
}

// Update Coins Display
function updateCoinsDisplay() {
  const coinsDisplay = document.querySelector('#coins-display');
  if (coinsDisplay) {
    coinsDisplay.textContent = `Coins: ${coins}`;
  }
}

// Background Selection
function selectBackground(backgroundImage) {
  if (purchasedBackgrounds.includes(backgroundImage)) {
    currentBackground = backgroundImage;
    applyBackground(currentBackground);
    alert('Background applied!');
  } else {
    alert('You do not own this background.');
  }
}

// Background Music
function startBackgroundMusic() {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5; // Default volume
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

// Event Listeners
function setupEventListeners() {
  // Login and Signup Buttons
  document.getElementById('login-button').addEventListener('click', login);
  document.getElementById('signup-button').addEventListener('click', signup);
  document.getElementById('logout-button').addEventListener('click', logout);

  // Navigation Buttons
  document.getElementById('play-button').addEventListener('click', () => {
    playButtonSound();
    alert('Starting game...'); // Replace with game logic
  });

  document.getElementById('shop-button').addEventListener('click', () => {
    playButtonSound();
    showScreen('shop-screen');
  });

  document.getElementById('levels-button').addEventListener('click', () => {
    playButtonSound();
    showScreen('levels-screen');
  });

  document.getElementById('settings-button').addEventListener('click', () => {
    playButtonSound();
    showScreen('settings-screen');
  });

  document.getElementById('back-to-home').addEventListener('click', () => {
    playButtonSound();
    showScreen('home-screen');
  });

  // Shop Buttons
  document.getElementById('buy-hint-button').addEventListener('click', () => {
    playButtonSound();
    buyItem('hint', 50);
  });

  document.getElementById('buy-bg1-button').addEventListener('click', () => {
    playButtonSound();
    buyItem('background', 100, 'assets/backgrounds/background1.jpg');
  });

  document.getElementById('buy-bg2-button').addEventListener('click', () => {
    playButtonSound();
    buyItem('background', 150, 'assets/backgrounds/background2.jpg');
  });

  // My Collection Buttons
  document.getElementById('use-bg1-button').addEventListener('click', () => {
    playButtonSound();
    selectBackground('assets/backgrounds/background1.jpg');
  });

  document.getElementById('use-bg2-button').addEventListener('click', () => {
    playButtonSound();
    selectBackground('assets/backgrounds/background2.jpg');
  });
}

// Password Preview
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
      }
