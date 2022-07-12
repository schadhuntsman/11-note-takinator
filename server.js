const notes = require('./Develop/db/db.json')
const path = require('path');
const uuid = require('uuid');
const express = require('express');


const PORT = process.env.PORT || 3000;
app.listen(port);

app.listen(PORT, () => {
    console.log(`API server now on port+ ${PORT}!`);
});

const app = express();


//reach public files
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// //start listen
// app.listen(PORT, function () {
//     console.log("listen to PORT: " + PORT);
// });

//start listen


//call notes __dirname
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

    

//add new to db.json
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const notesNew = req.body;
    notesNew.id = uuid.v4();
    notes.push(notesNew);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
});

//delete notes
app.delete('/api/notes/:id', (req, res) => {
const notes = JSON.parse(fs.readFileSync('./db/db.json'));
const dispatchNote = notes.filter((delNote) => delNote.id !== req.params.id);
fs.writeFileSync('.db/db.json', JSON.stringify(              dispatchNote));
res.json(dispatchNote);
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

