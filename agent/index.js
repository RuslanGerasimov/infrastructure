const config = require('./api/config');
const portfinder = require('portfinder');
const express = require('express');
const { notifyServer, notifyServerWithBuildResult } = require('./api/server');

const app = express();
app.use(express.json());

app.post('/build', (req, res) => {
    const { id, address, commitHash, command } = req.body;
    res.status(200).json({});
    //TODO: continue
    //clone repo
    //checkout to commit
    //execute command
    //send command result

    setTimeout(() => {
        notifyServerWithBuildResult(id, false, 'Some fake data');
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

