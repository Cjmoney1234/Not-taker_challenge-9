const express = require('express');

const notesR = require('./notes');

const app = express();

app.use('/notes', notesR);

module.exports = app;
