const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../routes/helpers/fsUtils');
//const notesData = require('../db/db.json');

notes.get('/', (req, res) => {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
    //res.json(notesData);
});



notes.delete('/notes_id', (req, res) => {
    let selID = parseInt(req.params.id);
    //  Read JSON file
    for (let i = 0; i < notesData.length; i++) {
      if (selID === notesData[i].id) {
        notesData.splice(i, 1);
        let noteJSON = JSON.stringify(notesData, null, 2);
  
        writeToFile("db/db.json", noteJSON).then(function () {
          console.log("Note has been deleted.");
 
    });
      }}
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
    //res.json(notesData);
});

module.exports = notes;




