const fs = require('fs');
const path = require('path');
const pathToConfig = path.resolve(__dirname, '..', 'agent-conf.json');

const config = JSON.parse(fs.readFileSync(pathToConfig).toString());

module.exports = {
    serverHost: config.serverHost,
    serverPort: config.serverPort,
    port: config.port,
    host: config.host
};