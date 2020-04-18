const axios = require('axios');
const https = require('https');
const config = require('./config');


const API_TOKEN = process.env.API_TOKEN;


const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

module.exports = axiosInstance;