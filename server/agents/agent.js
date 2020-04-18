const agents = [];

const getAgent = (host, port) => (agent) => agent.host === host && agent.port === port;

const addAgent = (host, port) => {
    const agentExist = agents.find(getAgent(host, port));
    if(!agentExist) {
        agents.push({
            host,
            port,
            isFree: true
        });
        console.log('agent added', host, port);
    }
};

const getFreeAgent = () => agents.find((agent) => agent.isFree);

const setAgentWorkStatus = (host, port, isFree) => {
    const agentIndex = agents.findIndex(getAgent(host, port));
    agents[agentIndex].isFree = !!isFree;
};

module.exports = { getFreeAgent, addAgent, setAgentWorkStatus };