// Initialize game data
let coins = 100;
let currentLevel = 1;
const totalLevels = 100;
const levelsStatus = JSON.parse(localStorage.getItem("levelsStatus")) || Array(totalLevels).fill(false);

// Login functionality
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    document.getElementById("user-name").textContent = user.username;
    showScreen("home-screen");
  } else {
    alert("Invalid username or password!");
  }
}

function signup() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!username || !password) {
    alert("Please enter a valid username and password!");
    return;
  }

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = storedUsers.some(user => user.username === username);

  if (userExists) {
    alert("Username already exists!");
    return;
  }

  storedUsers.push({ username, password, coins: 100 });
  localStorage.setItem("users", JSON.stringify(storedUsers));
  alert("Signup successful! You can now login.");
  showLogin();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  showLogin();
}

// Navigation between screens
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");

  // Update background dynamically
  const backgrounds = {
    "login-screen": "assets/backgrounds/background1.jpg",
    "signup-screen": "assets/backgrounds/background2.jpg",
    "home-screen": "assets/backgrounds/background3.jpg",
    "shop-screen": "assets/backgrounds/background1.jpg",
    "levels-screen": "assets/backgrounds/background2.jpg",
    "game-screen": "assets/backgrounds/background3.jpg",
  };
  document.body.style.backgroundImage = `url(${backgrounds[screenId]})`;
}

function showSignup() {
  showScreen("signup-screen");
}

function showLogin() {
  showScreen("login-screen");
}

// Shop, levels, and game logic remain unchanged...
