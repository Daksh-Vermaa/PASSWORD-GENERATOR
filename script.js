// State management
const state = {
  settings: {
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    emojis: false,
  },
  selectedEmojis: ["😊", "🎉", "🔥", "⭐", "💎"],
  currentPassword: "",
};

// Character sets
const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  initializeParticles();
  updateLengthDisplay();
  generatePassword();

  // Add event listener for length slider
  document.getElementById("length").addEventListener("input", (e) => {
    state.settings.length = parseInt(e.target.value);
    updateLengthDisplay();
    if (state.currentPassword) {
      generatePassword();
    }
  });
});

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (body.getAttribute("data-theme") === "dark") {
    body.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
  } else {
    body.setAttribute("data-theme", "dark");
    themeIcon.textContent = "🌙";
  }
}

// Create floating particles for background animation
function initializeParticles() {
  const container = document.querySelector(".floating-particles");

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.width = particle.style.height = Math.random() * 4 + 2 + "px";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    container.appendChild(particle);
  }
}

// Update length display
function updateLengthDisplay() {
  document.getElementById("length-value").textContent = state.settings.length;
}

// Toggle checkbox functionality
function toggleCheckbox(type) {
  state.settings[type] = !state.settings[type];
  const checkbox = document.getElementById(`checkbox-${type}`);

  if (state.settings[type]) {
    checkbox.classList.add("checked");
  } else {
    checkbox.classList.remove("checked");
  }

  // Show/hide emoji selector
  if (type === "emojis") {
    const emojiSection = document.getElementById("emoji-section");
    emojiSection.style.display = state.settings.emojis ? "block" : "none";
  }

  // Regenerate password if one exists
  if (state.currentPassword) {
    generatePassword();
  }
}

// Toggle emoji selection
function toggleEmoji(emoji) {
  const index = state.selectedEmojis.indexOf(emoji);
  if (index > -1) {
    state.selectedEmojis.splice(index, 1);
  } else {
    state.selectedEmojis.push(emoji);
  }

  // Regenerate password if emojis are enabled and password exists
  if (state.currentPassword && state.settings.emojis) {
    generatePassword();
  }
}

// Main password generation function
function generatePassword() {
  // Animate dice
  const dice = document.getElementById("dice");
  dice.classList.add("rolling");
  setTimeout(() => dice.classList.remove("rolling"), 600);

  // Build character set
  let charset = "";
  let poolSize = 0;

  if (state.settings.uppercase) {
    charset += charSets.uppercase;
    poolSize += 26;
  }
  if (state.settings.lowercase) {
    charset += charSets.lowercase;
    poolSize += 26;
  }
  if (state.settings.numbers) {
    charset += charSets.numbers;
    poolSize += 10;
  }
  if (state.settings.symbols) {
    charset += charSets.symbols;
    poolSize += charSets.symbols.length;
  }
  if (state.settings.emojis && state.selectedEmojis.length > 0) {
    charset += state.selectedEmojis.join("");
    poolSize += state.selectedEmojis.length;
  }

  // Validate charset
  if (!charset) {
    showToast("Please select at least one character type!", "error");
    return;
  }

  // Generate password
  let password = "";
  const length = state.settings.length;

  // Ensure at least one character from each selected type
  const guaranteedChars = [];
  if (state.settings.uppercase)
    guaranteedChars.push(getRandomChar(charSets.uppercase));
  if (state.settings.lowercase)
    guaranteedChars.push(getRandomChar(charSets.lowercase));
  if (state.settings.numbers)
    guaranteedChars.push(getRandomChar(charSets.numbers));
  if (state.settings.symbols)
    guaranteedChars.push(getRandomChar(charSets.symbols));
  if (state.settings.emojis && state.selectedEmojis.length > 0) {
    guaranteedChars.push(getRandomChar(state.selectedEmojis.join("")));
  }

  // Add guaranteed characters
  for (let i = 0; i < Math.min(guaranteedChars.length, length); i++) {
    password += guaranteedChars[i];
  }

  // Fill remaining length with random characters
  for (let i = password.length; i < length; i++) {
    password += getRandomChar(charset);
  }

  // Shuffle password to randomize guaranteed character positions
  password = shuffleString(password);

  // Update state and display
  state.currentPassword = password;
  document.getElementById("password").value = password;

  // Update strength meter
  updateStrengthMeter(password, poolSize);
}

// Regenerate current password
function regeneratePassword() {
  if (state.currentPassword) {
    generatePassword();
    showToast("Password regenerated!");
  }
}

// Utility function to get random character from string
function getRandomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

// Utility function to shuffle string
function shuffleString(str) {
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

// Update password strength meter
function updateStrengthMeter(password, poolSize) {
  const entropy = calculateEntropy(password.length, poolSize);
  const strength = getStrengthLevel(entropy);
  const crackTime = estimateCrackTime(entropy);

  // Update display elements
  document.getElementById("entropy").textContent = `Entropy: ${entropy.toFixed(
    1
  )} bits`;
  document.getElementById(
    "crack-time"
  ).textContent = `Crack time: ${crackTime}`;
  document.getElementById(
    "strength-text"
  ).textContent = `Password Strength: ${strength.label}`;

  // Update strength bar
  const strengthFill = document.getElementById("strength-fill");
  strengthFill.className = `strength-fill strength-${strength.class}`;
  strengthFill.style.width = `${strength.percentage}%`;
}

// Calculate password entropy
function calculateEntropy(length, poolSize) {
  return length * Math.log2(poolSize);
}

// Determine strength level based on entropy
function getStrengthLevel(entropy) {
  if (entropy < 30)
    return { label: "Very Weak", class: "very-weak", percentage: 20 };
  if (entropy < 50) return { label: "Weak", class: "weak", percentage: 40 };
  if (entropy < 70) return { label: "Medium", class: "medium", percentage: 60 };
  if (entropy < 90) return { label: "Strong", class: "strong", percentage: 80 };
  return { label: "Very Strong", class: "very-strong", percentage: 100 };
}

// Estimate time to crack password
function estimateCrackTime(entropy) {
  const guessesPerSecond = 1e9; // 1 billion guesses per second
  const totalGuesses = Math.pow(2, entropy) / 2; // Average case
  const seconds = totalGuesses / guessesPerSecond;

  if (seconds < 60) return "< 1 minute";
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
  return "Centuries";
}

// Copy password to clipboard
async function copyPassword() {
  const password = document.getElementById("password").value;
  if (!password) {
    showToast("No password to copy!", "error");
    return;
  }

  try {
    // Modern clipboard API
    await navigator.clipboard.writeText(password);
    showToast("Password copied to clipboard!");
  } catch (err) {
    // Fallback for older browsers
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    showToast("Password copied to clipboard!");
  }
}

// Show toast notification
function showToast(message, type = "success") {
  // Remove existing toast
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  // Create new toast
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Set error styling if needed
  if (type === "error") {
    toast.style.background = "var(--danger)";
  }

  // Add to DOM
  document.body.appendChild(toast);

  // Show toast with animation
  setTimeout(() => toast.classList.add("show"), 100);

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
