const path = require('path');
const {spawn} = require('child_process');
const {StringDecoder} = require('string_decoder');
const {deleteDir, checkIfDirExists} = require('./fs');

const getRepositoryFolder = (repositoryName, repositoryFolder) => path.resolve(repositoryFolder, repositoryName);

const cloneRepository = (repositoryName, repoFolder) => {
    return new Promise(async (resolve, reject) => {
        console.log(repoFolder);
        await deleteDir(repoFolder);
        await checkIfDirExists(repoFolder);

        const child = spawn('git', ['clone', `https://github.com/${repositoryName}`, repoFolder], {
            "cwd": repoFolder
        });
        let error = "";
        const decoder = new StringDecoder('utf8');
        child.stderr.on('data', function (buffer) {
            error += decoder.write(buffer);
        });
        child.on('exit', (code) => {
            if (!error || !code) {
                return resolve(true);
            } else {
                deleteDir(repoFolder).finally(() => {
                    reject(error);
                })
            }
        });
    });
};

const gitPull = (repositoryName, repoDir = repositoriesDir) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('git', ['pull'], {
            "cwd": getRepositoryFolder(repositoryName, repoDir)
        });
        childProcess.on('exit', (code) => {
            if (!code) {
                resolve(true);
            } else {
                reject(code);
            }
        });
        childProcess.on('error', (error) => {
            reject(error);
        })
    });
};

const checkoutCommit = (hashCommit, repoFolder) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('git', ['checkout', hashCommit], {
            "cwd": repoFolder
        });
        childProcess.on('exit', (code) => {
            if (!code) {
                resolve(true);
            } else {
                reject(code);
            }
        });
        childProcess.on('error', (error) => {
            reject(error);
        })
    });
};

module.exports = {cloneRepository, gitPull, getRepositoryFolder, checkoutCommit};