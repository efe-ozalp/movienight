import fs from "fs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

function readData() {
  const file = path.join(__dirname, "input.json");
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw);
}

function writeData(data) {
  const file = path.join(__dirname, "input.json");
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get("/get_words", (req, res) => {
  res.json(readData());
});

app.post("/add-word", (req, res) => {
  let { word } = req.body;
  if (!word || typeof word !== "string") return res.json({ success: false });

  word = word.toLowerCase().trim();
  const data = readData();
  const existing = data.find(w => w.word === word);

  if (existing) existing.value += 1;
  else data.push({ word, value: 1 });

  writeData(data);
  res.json({ success: true, data });
});

app.post("/reset", (req, res) => {
  writeData([]);
  res.json({ success: true, data: [] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});