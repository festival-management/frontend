import {User} from "./users.model";
import BaseResponse from "./base.model";

export interface LoginResponse extends BaseResponse {
    access_token?: string;
    token_type?: string;
}

export interface RegisterResponse extends BaseResponse {
    user?: User;
}

// Interface for the useAuthApi hook
export interface UseAuthApiInterface {
    login(username: string, password: string): Promise<LoginResponse>;

    register(username: string, password: string, roleId: number): Promise<RegisterResponse>;
}
