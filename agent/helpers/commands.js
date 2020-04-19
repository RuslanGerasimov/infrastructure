const { spawn } = require('child_process');
const {StringDecoder} = require('string_decoder');

const execCommand = (buildCommand, pathToDir) => {
    return new Promise((resolve, reject) => {
        let dataString = '';
        let error = '';
        const parts = buildCommand.split(' ');
        let command = parts.shift();
        command = command === 'npm' && /^win/.test(process.platform) ? 'npm.cmd' : command;
        const child = spawn(command, [...parts], { "cwd": pathToDir });
        const decoder = new StringDecoder('utf8');
        child.stderr.on('data', function (buffer) {
            error += decoder.write(buffer);
        });
        child.stdout.on('data', (buffer) => {
            dataString += decoder.write(buffer);
        });

        child.on('exit', (code) => {
            if (!error || !code) {
                resolve({status: 'success', data: dataString});
            } else {
                resolve({status: 'error', data: error});
            }
        });
    });
};

module.exports = { execCommand };