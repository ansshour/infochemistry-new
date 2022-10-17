import $api from "../http";
import { AxiosResponse } from "axios"
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/login", { username, email, password })
    }

    static async registration(last_name: string, first_name: string, middle_name: string, group: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/registration", { last_name, first_name, middle_name, group, email, password })
    }

    static async logout(): Promise<void> {
        return $api.post("/logout")
    }
}