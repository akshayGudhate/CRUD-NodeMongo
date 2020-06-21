const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
const port = process.env.PORT || 2222;
const Item = require('./dataModels/itemModel');
const itemRouter = require('./routes/itemRouter')(Item);

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.use('/api', itemRouter);

app
    .get('/', (req, res) => {
        res.send('hey... This is NodeJS project');
    })
    .get('/api', (req, res) => {
        res.sendFile(path.join(__dirname, './index.html'));
    });

app.listen(port, (req, res) => {
    console.log(`App is listning on port ${port}.. !!`)
});