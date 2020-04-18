const axios = require('./axios');

const notifyServer = (port, host) => {
    axios.post('/notify-agent', {
        host: host,
        port: port
    }).then(() => {
        console.log('Serer notified')
    }).catch(() => {
        console.log('No response from server');
    })
};


const notifyServerWithBuildResult = (buildId, status, log) => {
    axios.post('/notify-build-result', {
        host: host,
        port: port
    }).then(() => {
        console.log('Serer notified')
    }).catch(() => {
        console.log('No response from server');
    })
};

module.exports = {
    notifyServer
};
