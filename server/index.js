require('dotenv').config();
const axiosInstance = require('./api/axios');
const express = require('express');
const app = express();
const config = require('./api/config');
const { fetchWaitingBuild } = require('./api/api');
const router = require('./routing/router');

app.use('/', router);

app.listen(config.port, function () {
    console.log(`App listening on port ${config.port}!`);
});

/**/
fetchWaitingBuild()
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

/**/