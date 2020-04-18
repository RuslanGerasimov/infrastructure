const {fetchSettings, fetchWaitingBuild, setRunBuild} = require('./api');
const {getFreeAgent, setAgentWorkStatus} = require('../agents/agent');
const {sendBuildToBuild} = require('./agent');
const appConfig = {};


const init = () => {
    return fetchSettings().then((config) => {
        appConfig.repoName = config.repoName;
        return true;
    })
};

const runBuild = async (agent) => {
    const build = await fetchWaitingBuild();
    if(build) {
        await setRunBuild(build.id);
        await sendBuildToBuild(agent, build, "FAKE", "FAKE");
        setAgentWorkStatus(agent, build.id);
    }
};

const runApp = () => {
    init().then(() => {
        const a = setInterval(() => {
            const agent = getFreeAgent();
            if (agent) {
                clearInterval(a);
                runBuild(agent);
            }
        }, 7000)
    }).catch((err) => {
        if (err.status === 500) {
            console.log('try to rerun application');
            runApp();
        }
    })
};

module.exports = {runApp};