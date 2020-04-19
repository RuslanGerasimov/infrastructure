const { Router } = require('express');
const router = Router();
const { addAgent, resetAgent } = require('../agents/agent');
const {setFinishBuild, fetchBuild} = require("../api/api");

//host, port
router.post('/notify-agent', (req, res) => {
    const {host, port} = req.body;
    addAgent(host, port);
    res.status(200).json('ok');
});


//id, status, log
router.post('/notify-build-result', async (req, res) => {
    const {id, status, log} = req.body;
    resetAgent(id);
    const endDate = new Date();
    const timeOffset = endDate.getTimezoneOffset();
    const build = await fetchBuild(id);

    if(build) {
        const startDate = new Date(build.start);
        const duration = Math.round((endDate - startDate + timeOffset * 60 * 1000) / 1000);
        console.log(startDate, endDate, duration);
        await setFinishBuild(id, duration, !!status, log);
    }
    res.status(200).json('ok');
});

module.exports = router;