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
                reject(err);
            })
    })
};


module.exports = { fetchWaitingBuild };