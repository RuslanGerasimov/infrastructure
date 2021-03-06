const axiosInstance = require('./axios');

const fetchWaitingBuild = (limit = 25, offset = 0) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/build/list?limit=${limit}&offset=${offset}`)
            .then(async (res) => {
                const { data: result } = res;
                const data = result.data;

                const waitingBuilds = data.filter((build) => build.status === 'Waiting');
                if(waitingBuilds.length > 0) {
                    resolve(waitingBuilds.shift())
                } else if(data.length === limit) {
                    const build = await getWaitingBuild(limit, offset + data.length);
                    resolve(build);
                } else if(data.length < limit) {
                    resolve(null);
                }
            }).catch((err) => {
                if(err.status === 500) {
                    setTimeout(() => {
                        fetchWaitingBuild(limit, offset)
                            .then((data) => { resolve(data) })
                            .catch((err) => { reject(err) })
                    }, 300);
                } else {
                    reject(err);
                }
            })
    })
};

const fetchBuild = (id) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get('/build/details?buildId=' + id)
            .then((res) => {
                const result = res.data;
                resolve(result.data);
            }).catch((err) => {
                if(err.status === 500) {
                    setTimeout(() => {
                        fetchBuild(id)
                            .then((data) => { resolve(data) })
                            .catch((err) => { reject(err) })
                    }, 300);
                } else {
                    reject(err);
                }
            })
    });
};

const setRunBuild = (buildId) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/build/start', {
            buildId: buildId,
            dateTime: (new Date()).toISOString()
        }).then(() => {
            resolve(true);
        }).catch((err) => {
            if(err.status === 500) {
                setTimeout(() => {
                    setRunBuild(buildId)
                        .then((data) => { resolve(data) })
                        .catch((err) => { reject(err) })
                }, 300);
            } else {
                reject(err);
            }
        })
    });
};

const cancelBuild = (buildId) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/build/cancel', {
            buildId: buildId
        }).then(() => {
            resolve(true);
        }).catch((err) => {
            if(err.status === 500) {
                setTimeout(() => {
                    cancelBuild(buildId)
                        .then((data) => { resolve(data) })
                        .catch((err) => { reject(err) })
                }, 300);
            } else {
                reject(err);
            }
        })
    });
};

const setFinishBuild = (buildId, duration, isSuccess, buildLog) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/build/finish', {
            buildId: buildId,
            duration: duration,
            success: isSuccess,
            buildLog: buildLog
        }).then(() => {
            resolve(true);
        }).catch((err) => {
            if(err.status === 500) {
                setTimeout(() => {
                    setFinishBuild(buildId, duration, isSuccess, buildLog)
                        .then((data) => { resolve(data) })
                        .catch((err) => { reject(err) })
                }, 300);
            } else {
                reject(err);
            }
        })
    });
};

const fetchSettings = () => {
    return new Promise((resolve, reject) => {
        axiosInstance.get('/conf').then((res) => {
            const {data: result} = res;
            resolve(result.data);
        }).catch((err) => {
            if(err.status === 500) {
                setTimeout(() => {
                    fetchSettings()
                        .then((data) => { resolve(data) })
                        .catch((err) => { reject(err) })
                }, 300);
            } else {
                reject(err);
            }
        })
    });
};

module.exports = { fetchSettings, fetchWaitingBuild, setRunBuild, cancelBuild, setFinishBuild, fetchBuild };