const express = require('express');
const bodyParser = require('body-parser');
const FileAsync = require('lowdb/adapters/FileAsync');

const app = express();
const cors = require('cors');
const low = require('lowdb');
const adapter = new FileAsync('./server/db.json');
const config = require('../config.json');

const port = config.port;

app.use(cors());
app.use(bodyParser.json());

low(adapter)
    .then(db => {

        app.get('/characters', (req, res) => {
            const characters = db.get('characters')
                .value();

            res.send(characters)
        });

        app.get('/characters/random', (req, res) => {
            const characters = db.get('characters')
                .value();

            const id = Math.floor(Math.random() * (characters.length));

            res.send(characters[id]);
        });

        app.get('/characters/:id', (req, res) => {
            const character = db.get('characters')
                .find({
                    'id': parseInt(req.params.id, 10)
                })
                .value();

            res.send(character)
        });

        app.post('/characters', (req, res) => {
            const ID = db.get('characters').size().value() + 1;

            db.get('characters')
                .push(req.body)
                .last()
                .assign({
                    'id': ID
                })
                .write()
                .then(character => res.send(character));
        });

        app.delete('/characters/:id', (req, res) => {
            db.get('characters')
                .remove({
                    'id': parseInt(req.params.id, 10)
                })
                .write()
                .then(character => res.send(character[0]));
        });

        app.put('/characters', (req, res) => {
            db.get('characters')
                .find({
                    'id': parseInt(req.body.id, 10)
                })
                .assign(req.body)
                .write()
                .then(character => res.send(character));
        });

    })
    .then(() => {
        app.listen(port, () => console.log(`listening on port ${port}`));
    });
