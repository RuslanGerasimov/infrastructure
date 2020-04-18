const agents = [];

const addAgent = (port) => {
    const agentExist = agents.find((agent) => agent.port === port);
    if(!agentExist) {
        agents.push({
            port,
            isFree: true
        });
    }
};

const getFreeAgent = () => agents.find((agent) => agent.isFree);

const setAgentWorkStatus = (port, isFree) => {
    const agentIndex = agents.findIndex((agent) => agent.port === port);
    agents[agentIndex].isFree = !!isFree;
};

module.exports = { getFreeAgent, addAgent, setAgentWorkStatus };