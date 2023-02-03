const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../routes/helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
});



notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    console.log("Deleted ", noteId);
    readFromFile("db/db.json").then((data) => {
        const notes = JSON.parse(data);

        const filteredNotes = notes.filter((note) => note.noteId == noteId);
        return filteredNotes;
    });
});



notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNotes = {
            title,
            text,
            note_id: uuidv4(),
        };
        readAndAppend(newNotes, 'db/db.json');
        res.json('Notes added successfully 🚀');
    }   else {
        res.json('Error in posting notes');
    }
});

module.exports = notes;