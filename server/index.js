require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./api/config');
const router = require('./routing/router');
const { runApp } = require('./api/app');

const app = express();
app.use(bodyParser.json({ extended: true }));

app.use('/', router);

runApp();

app.listen(config.port, function () {
    console.log(`App listening on port ${config.port}!`);
});