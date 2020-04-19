const {fetchSettings, fetchWaitingBuild, setRunBuild} = require('./api');
const {getFreeAgent, setAgentWorkStatus} = require('../agents/agent');
const {sendBuildToBuild} = require('./agent');
const appConfig = {};


const init = () => {
    return fetchSettings().then((config) => {
        appConfig.repoName = config.repoName;
        appConfig.buildCommand = config.buildCommand;
        return true;
    })
};

const runBuild = async (agent, repo, command) => {
    try {
        const build = await fetchWaitingBuild();
        if(build) {
            await setRunBuild(build.id);
            await sendBuildToBuild(agent, build, repo, command);
            setAgentWorkStatus(agent, build.id);
        }
    } catch (e) {
        console.log('app.js: 24', e.message);
    }
};

const runApp = () => {
    init().then(() => {
        setInterval(() => {
            const agent = getFreeAgent();
            if (agent) {
                runBuild(agent, appConfig.repoName, appConfig.buildCommand);
            }
        }, 5000)
    }).catch((err) => {
        if (err.status === 500) {
            console.log('try to rerun application');
            runApp();
        }
    })
};

module.exports = {runApp};