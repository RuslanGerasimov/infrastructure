const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const deleteDir = (folder) => new Promise((resolve, reject) => {
    rimraf(folder, function () {
        console.log(...arguments);
        resolve(true)
    });
});

const checkIfDirExists = (dir) => new Promise((resolve, reject) => {
    fs.access(dir, function (err) {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(dir, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            });
        } else {
            resolve(true);
        }
    });
});

const checkIfDirsExists = async (dirs) => {
    let totalDir = null;
    for(let dir of dirs) {
        if(!totalDir) {
            totalDir = path.resolve(dir);
        } else {
            totalDir = path.resolve(totalDir, dir);
        }

        await checkIfDirExists(totalDir);
    }
    return true;
};

module.exports = {
    deleteDir,
    checkIfDirExists,
    checkIfDirsExists
};