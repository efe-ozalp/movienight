const bannedWords = [
  "shit",
  "fuck",
  "bitch"
  "asshole",
    "dick",
    "pussy",
    "cunt",
    "slut",
    "whore",
    "douchebag",
    "retard",
    "dumbass"
];

function containsBannedWord(text) {
  const lower = text.toLowerCase();
  return bannedWords.some(word => lower.includes(word));
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("optionForm");
  const input = document.getElementById("optionInput");
  const message = document.getElementById("message");
  const list = document.getElementById("optionsList");

 
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const value = input.value.trim();

    if (!value) {
      message.textContent = "Please enter text.";
      message.className = "message error";
      return;
    }

    if (containsBannedWord(value)) {
      message.textContent = "That option includes inappropriate language.";
      message.className = "message error";
      return;
    }

    const li = document.createElement("li");
    li.textContent = value;
    list.appendChild(li);

    // Success message
    message.textContent = "Added!";
    message.className = "message success";

    input.value = "";
  });
});
