const path = require('path');
const uuid = require('uuid');
const express = require('express');
var app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3003;


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//saves notes and joins
app.get('/api/notes', (req, res) => {
       res.sendFile(path.join(__dirname, "/db/db.json"));
});
    

//add new to db.json
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const notesNew = req.body;
    notesNew.id = uuid.v4();
    notes.push(notesNew);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes))
    res.json(notes);
});

//delete notes
app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json")))
    const dispatchNote = notes.filter((delNote) => delNote.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(dispatchNote));
    res.json(dispatchNote);
})

//call home
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//call notes
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// //start listen
app.listen(PORT, function () {
    console.log("listen to PORT: " + PORT);
});



//reach public files
// app.get('/api/notes/:id', (req, res) => {
//     const notes = JSON.parse(fs.readFileSync('./db/db.json'));
//     const result = findId(req.params.id, notes);    
//     res.json(result);