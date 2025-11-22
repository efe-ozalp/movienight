const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()); // parse JSON in requests

app.post('/add-word', (req, res) => {
    const newWord = req.body.word;
   
    const data = JSON.parse(fs.readFileSync("inputs.json")); //read json

    const existing = data.find(w => w.word === newWord);
    if (existing) {
        existing.value += 1;
    } else {
        data.push({ word: newWord, value: 1 });
    }

    fs.writeFileSync('words.json', JSON.stringify(data, null, 2));

    res.send({ success: true, data: data });
});

app.listen(3000, () => console.log('Server running on port 3000'));
