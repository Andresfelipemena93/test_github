import axios from 'axios'
import secrets from "./secrets";

const API = {}

const baseURL = `${secrets.APP_URL}`

const axiosInstance = axios.create({
    baseURL: baseURL,
})

function responseHandler(response) {
   return response.data
}

axiosInstance.interceptors.response.use(responseHandler, (error) => Promise.reject(error))


API.getAllUser = (user) => axiosInstance.get(`/search/users`, {
    params: {
        q: user
    }
});

API.getUser = (user) => axiosInstance.get(`/users/${user}`);

export default API