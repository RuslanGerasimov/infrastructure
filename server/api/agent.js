const axios = require('axios');

const sendBuildToBuild = (agent, build, gitRepo, command) => {
    return new Promise((resolve, reject) => {
        const {host, port} = agent;
        axios.post('http://' + host + ':' + port + '/build', {
            id: build.id,
            address: gitRepo,
            commitHash: build.commitHash,
            buildCommand: command
        }).then(() => {
            resolve(true);
        }).catch(() => {
            reject(false);
        })
    })
};

module.exports = { sendBuildToBuild };