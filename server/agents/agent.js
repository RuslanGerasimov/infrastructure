const agents = [];

const getAgent = (host, port) => (agent) => agent.host === host && agent.port === port;

const addAgent = (host, port) => {
    const agentExist = agents.find(getAgent(host, port));
    if(!agentExist) {
        agents.push({
            host,
            port,
            buildId: null,
            isFree: true
        });
        console.log('agent added', host, port);
    }
};

const getFreeAgent = () => agents.find((agent) => agent.isFree);

const setAgentWorkStatus = (agent, buildId) => {
    const {host, port} = agent;
    const agentIndex = agents.findIndex(getAgent(host, port));
    agents[agentIndex].isFree = false;
    agents[agentIndex].buildId = buildId;
};

const resetAgent = (buildId) => {
    const agentIndex = agents.findIndex((agent) => agent.buildId === buildId);
    agents[agentIndex].isFree = true;
    agents[agentIndex].buildId = null;
};

module.exports = { getFreeAgent, addAgent, setAgentWorkStatus, resetAgent };