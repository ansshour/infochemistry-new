import { UserT } from "../UserT";

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: UserT;
}