const {fetchSettings, fetchWaitingBuild} = require('./api');
const {getFreeAgent} = require('../agents/agent');
const appConfig = {};


const init = () => {
    return fetchSettings().then((config) => {
        appConfig.repoName = config.repoName;
        return true;
    })
};

const runBuild = () => {
    fetchWaitingBuild().then((build) => {
        if(build) {
            console.log('need to build', build);
        }
    })
};

const runApp = () => {
    init().then(() => {
        setInterval(() => {
            const agent = getFreeAgent();
            if(agent) {
                runBuild();
            }
        }, 7000)
    }).catch((err) => {
        if(err.status === 500) {
            console.log('try to rerun application');
            runApp();
        }
    })
};

module.exports = { runApp };