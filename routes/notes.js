const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
} = require('../routes/helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('../Develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {

    const { noteTitle, noteText } = req.body;

    if (noteTitle && noteText) {
        const newNotes = {
            noteTitle,
            noteText,
            note_id: uuidv4(),
        };
        readAndAppend(newNotes, '../Develop/db/db.json');

        const response = {
            status: 'Success',
            body: newNotes,
        };

        res.json(response);
    }   else {
        res.json('Error in posting notes');
    }
});

module.exports = notes;




