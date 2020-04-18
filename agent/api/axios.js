const axios = require('axios');
const config = require('./config');

const axiosInstance = axios.create({
    baseURL: 'http://' + config.serverHost + ':' + config.serverPort,
    headers: {
        'Content-Type': 'application/json'
    },
});

module.exports = axiosInstance;