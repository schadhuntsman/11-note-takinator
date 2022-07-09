const { notes } = require('./Develop/db/db.json')

const express = require('express');
const app = express();

app.get('/api/notes', (req, res) => {
    res.send('Hello!');
    res.send('Bonjor')
});

app.listen(3004, () => {
    console.log(`API server now on port 3002!`);
});