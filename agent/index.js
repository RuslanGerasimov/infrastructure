const config = require('./api/config');
const portfinder = require('portfinder');
const express = require('express');
const app = express();
const { notifyServer } = require('./api/server');


app.post('/build', (req, res) => {
    const { id, address, commitHash, command } = req.body;
    //clone repo
    //checkout to commit
    //execute command
    //send command result

    setTimeout(() => {
        res.status(200).json({
            id,
            status: 'success',
            log: 'Some fake result'
        });
    }, 5000);
});

const port = config.port;
const host = config.host;

portfinder.getPortPromise({
    port: port
}).then((port) => {
    const server = app.listen(port, host, function () {
        console.log(`App listening on port ${port}!`);
        const host = server.address().address;
        const realPort = server.address().port;
        notifyServer(realPort, host)
    });
});

