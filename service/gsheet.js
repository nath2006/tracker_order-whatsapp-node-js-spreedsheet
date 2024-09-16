const axios = require('axios');

const baseUrl = ""

const axiosInstance = axios.create({
    baseUrl: baseUrl,
    Headers: {
        "Content-type": "application/json"
    }
})