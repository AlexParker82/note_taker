const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');

notes.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    }).catch((err) => console.error(err))
});

notes.post('/api/notes', (req, res) => {
    
})

module.exports = notes;