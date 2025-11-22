const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()); // parse JSON in requests
app.use(express.static(__dirname));

app.post('/add-word', (req, res) => {
    const newWord = req.body.word;
   
    const data = JSON.parse(fs.readFileSync("input.json")); //read json

    const existing = data.find(w => w.word === newWord);
    if (existing) {
        existing.value += 1;
    } else {
        data.push({ word: newWord, value: 1 });
    }

    fs.writeFileSync('input.json', JSON.stringify(data, null, 2));

    res.send({ success: true, data: data });
});

app.get('/get_words', (req, res) => {
    const data = JSON.parse(fs.readFileSync('input.json'));
    res.json(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));
