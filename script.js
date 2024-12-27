// Global Variables
let coins = 500; // Starting coins
let purchasedBackgrounds = []; // Tracks purchased backgrounds
let currentBackground = 'assets/backgrounds/background1.jpg'; // Default background
let backgroundMusic = new Audio('assets/music/game-music.mp3'); // Background music
let buttonClickSound = new Audio('assets/sounds/button-click.mp3'); // Button click sound

// Initialize Game
document.addEventListener('DOMContentLoaded', () => {
  updateCoinsDisplay();
  applyBackground(currentBackground);
  setupEventListeners();
  startBackgroundMusic();
});

// Screen Navigation
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  // Update background dynamically based on screen
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

// Background Functions
function applyBackground(imageUrl) {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}

// Button Click Sound
function playButtonSound() {
  buttonClickSound.currentTime = 0;
  buttonClickSound.play();
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

// Settings
function toggleSetting(settingId) {
  const setting = document.getElementById(settingId);
  if (setting.checked) {
    if (settingId === 'music-toggle') startBackgroundMusic();
  } else {
    if (settingId === 'music-toggle') stopBackgroundMusic();
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
  // Navigation buttons
  document.getElementById('show-login').addEventListener('click', () => {
    playButtonSound();
    showScreen('login-screen');
  });

  document.getElementById('show-signup').addEventListener('click', () => {
    playButtonSound();
    showScreen('signup-screen');
  });

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

  document.getElementById('logout-button').addEventListener('click', () => {
    playButtonSound();
    showScreen('login-screen');
  });

  // Shop buttons
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

  // My Collection buttons
  document.getElementById('use-bg1-button').addEventListener('click', () => {
    playButtonSound();
    selectBackground('assets/backgrounds/background1.jpg');
  });

  document.getElementById('use-bg2-button').addEventListener('click', () => {
    playButtonSound();
    selectBackground('assets/backgrounds/background2.jpg');
  });

  // Settings toggles
  document.getElementById('music-toggle').addEventListener('change', () => {
    playButtonSound();
    toggleSetting('music-toggle');
  });

  document.getElementById('volume-toggle').addEventListener('change', () => {
    playButtonSound();
    alert('Volume settings adjusted!'); // Extend with volume control logic
  });

  document.getElementById('vibration-toggle').addEventListener('change', () => {
    playButtonSound();
    alert('Vibration toggled!'); // Extend with vibration logic
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
