
import { LoginT, RegisterT } from '../types/typesAuth';
import axios from "axios";

axios.defaults.baseURL = "https://new.infochemistry.ru/api";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config: any) => {
    if (window.localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
    }
    return config
})


export const AuthService = {
    async login({ username, password }: LoginT) {
        return axios.post("auth/login/",
            {
                username: username,
                password: password
            })
    },

    async register({ username, email, password1, password2, last_name, first_name, middle_name, university_group }: RegisterT) {
        return axios.post("auth/register/",
            {
                username: username,
                email: email,
                password1: password1,
                password2: password2,
                last_name: last_name,
                first_name: first_name,
                middle_name: middle_name,
                university_group: university_group
            })
    },

    async logout() {
        if (window.location.pathname.includes("teacher_personal_account") || window.location.pathname.includes("online_lab") || window.location.pathname.includes("createlab")) {
            window.location.href = "/";
        }
        return axios.post("auth/logout/")
    },

    async getUserData() {
        try {
            return await axios.get("auth/user/");

        } catch (err) {
            if (err.response.status === 401) {
                try {
                    if (window.localStorage.getItem("refresh")) {
                        const response = await axios.post("auth/token/refresh/", { refresh: window.localStorage.getItem("refresh") });
                        window.localStorage.setItem("token", response.data.access)
                    }
                } catch (err) {

                }
            }
            throw err;
        }
    },

    async refresh() {
        try {
            if (window.localStorage.getItem("refresh")) {
                const response = await axios.post("auth/token/refresh/", { refresh: window.localStorage.getItem("refresh") });
                window.localStorage.setItem("token", response.data.access)
            }
        } catch (err) {

        }
    }
}