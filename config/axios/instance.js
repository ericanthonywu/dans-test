const axios = require('axios');
const rTracer = require('cls-rtracer');
const Env = require("../Environment");

const instance = axios.create({
    baseURL: Env.JOB_URL
})

instance.interceptors.response.use((data) => data.data, (error) => {
    if (!error.response) {
        console.error(`${rTracer.id()} server responded with no response`)
        return Promise.reject(error)
    } else {
        console.error(`${rTracer.id()} Error when doing http request with status code ${error.response.status} \n [${error.config.method}] ${error.config.url} \n headers: ${error.config.headers} \n response: ${error.response.data}`)
        return Promise.reject(error.response.data)
    }
})

module.exports = instance