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
    let noteArray = [];

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        noteArray.push(newNote);

        //const arrayString = JSON.stringify(noteArray);

        fs.writeFile('./db/db.json', noteArray)
        .catch((err) => console.error(err));

        const response ={
            status: 'success',
            body: arrayString
        };

        res.json(response);


    } else console.info('Need title and text')

});

module.exports = notes;

