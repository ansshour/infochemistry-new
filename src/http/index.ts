import axios from "axios"

export const API_URL = `https://new.infochemistry.ru/api/`

const $api = axios.create({
    baseURL: API_URL,
})

$api.interceptors.request.use((config: any) => {
    if (window.localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
    return config;
})

export default $api;