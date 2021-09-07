const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const e = require('express');

notes.get('/', (req, res) => {
    fs.readFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    }).catch((err) => console.error(err))
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        fs.readFile('./db/db.json').then((data) => {
            const parsedNote = JSON.parse(data);

            parsedNote.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4))
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));

        const response = {
            status: 'success',
            body: newNote,
        };

        console.info(response);
        res.status(200).json(response);

    } else res.status(400).json('Error creating note');

});

module.exports = notes;



