const { Router } = require('express');
const router = Router();
const { addAgent } = require('../agents/agent');

//host, port
router.post('/notify-agent', (req, res) => {
    const {host, port} = req.body;
    addAgent(host, port);
    res.status(200).json('ok');
});


//id, status, log
router.post('/notify-build-result', (req, res) => {
    const {id, status, log} = req.body;
    res.status(200).json('ok');
});

module.exports = router;