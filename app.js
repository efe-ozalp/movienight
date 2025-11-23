const bannedWords = [
  "shit",
  "fuck",
  "bitch",
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


async function loadWordCloud() {
  const response = await fetch("/get_words");
  const data = await response.json();
  
  const list = data.map(item => [item.word, item.value * 10]);
  
  if (list.length > 0) {
    WordCloud(document.getElementById("cloud_canvas"), {
      list: list,
      weightFactor: 10,
      backgroundColor: '#f5f5f5'
    });
  }
}


generateBtn.addEventListener("click", () => {
  const items = Array.from(list.querySelectorAll("li"));

  if (items.length === 0) {
    generatedMovieEl.textContent = "No movies available. Add some first!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  const movieName = items[randomIndex].textContent;

  generatedMovieEl.textContent = "Generated movie: " + movieName;
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("optionForm");
  const input = document.getElementById("optionInput");
  const message = document.getElementById("message");
  const list = document.getElementById("optionsList");

  loadWordCloud();

  if (!form) return;

  form.addEventListener("submit", async function (e) {
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

    // Send to backend
    const response = await fetch('/add-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ word: value })
    });

    const result = await response.json();

    if (result.success) {
      const li = document.createElement("li");
      li.textContent = value;
      list.appendChild(li);

      message.textContent = "Added!";
      message.className = "message success";

      input.value = "";

      loadWordCloud();
    }
  });
});
