const fs = require('fs');
const path = require('path');
const pathToConfig = path.resolve(__dirname, '..', 'server-conf.json');
const config = JSON.parse(fs.readFileSync(pathToConfig).toString());

module.exports = config;