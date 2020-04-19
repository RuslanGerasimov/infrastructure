const config = require('./api/config');
const portfinder = require('portfinder');
const express = require('express');
const {notifyServer, notifyServerWithBuildResult} = require('./api/server');
const {cloneRepository, checkoutCommit, gitPull} = require('./helpers/git');
const {execCommand} = require('./helpers/commands');
const {checkIfDirsExists} = require('./helpers/fs');
const path = require('path');

const hostPortConfig = {
    host: '',
    port: ''
};

const app = express();
app.use(express.json());

app.post('/build', async (req, res) => {
    const {id, address, commitHash, buildCommand} = req.body;
    res.status(200).json({});
    const [author, repo] = address.split('/');
    const pathParts = [__dirname, 'repositories', hostPortConfig.host.toString(), hostPortConfig.port.toString(), author, repo];
    const pathToDir = path.resolve(...pathParts);
    await checkIfDirsExists(pathParts);
    let isSuccess = null;
    let testsStatus = null;
    let log = '';
    try {
        //clone repo
        await cloneRepository(address, pathToDir);
        //checkout to commit
        await checkoutCommit(commitHash, pathToDir);
        //execute command
        const commands = buildCommand.split('&&');

        for (let command of commands) {
            const {status, data: output} = await execCommand(command.trim(), pathToDir);
            log += output;
            isSuccess = status === 'success';
            testsStatus = buildCommand.indexOf(' test') > 0 ? isSuccess : testsStatus;
        }
    } catch (e) {
        isSuccess = false;
        testsStatus = false;
        log += e.message;
    }
    notifyServerWithBuildResult(id, testsStatus !== null ? testsStatus : isSuccess, log);
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
        hostPortConfig.host = host;
        hostPortConfig.port = realPort;
        notifyServer(realPort, host)
    });
});

