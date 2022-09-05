import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_PTCG_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

export default http
