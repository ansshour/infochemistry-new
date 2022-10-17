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

$api.interceptors.response.use(config => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest)
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const { data } = await axios.post("auth/token/refresh/", { refresh: window.localStorage.getItem("refresh") });
            localStorage.setItem("token", data.access)
            console.log(await $api.request(originalRequest))
            return $api.request(originalRequest);
        } catch (err) {

        }
    }
    throw error
})

export default $api;