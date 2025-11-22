// =========================
// CUSTOM OPTION INPUT LOGIC
// =========================

// Add banned words here to filter inappropriate language
const bannedWords = [
  "shit",
  "fuck",
  "bitch"
  "asshole",
    "dick",
    "pussy",
    "cunt",,
    "faggot",
    "slut",
    "whore",
    "douchebag"
    "retard"
    "dumbass"
    "fag"
];

// Check if text contains banned word
function containsBannedWord(text) {
  const lower = text.toLowerCase();
  return bannedWords.some(word => lower.includes(word));
}

// Wait for page to load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("optionForm");
  const input = document.getElementById("optionInput");
  const message = document.getElementById("message");
  const list = document.getElementById("optionsList");

  // Only run if vote room exists
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const value = input.value.trim();

    // Empty input
    if (!value) {
      message.textContent = "Please enter text.";
      message.className = "message error";
      return;
    }

    // Inappropriate language
    if (containsBannedWord(value)) {
      message.textContent = "That option includes inappropriate language.";
      message.className = "message error";
      return;
    }

    // Add to list
    const li = document.createElement("li");
    li.textContent = value;
    list.appendChild(li);

    // Success message
    message.textContent = "Added!";
    message.className = "message success";

    input.value = "";
  });
});
