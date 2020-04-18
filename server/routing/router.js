const { Router } = require('express');
const router = Router();

//host, port
router.post('/notify-agent', (req, res) => {
    const {id, port} = req.body;
    res.status(200).json('ok');
});


//id, status, log
router.post('/notify-build-result', (req, res) => {
    const {id, status, log} = req.body;
    res.status(200).json('ok');
});

module.exports = router;