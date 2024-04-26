import BaseResponse from "./base.model";

export interface User {
    id: number;
    username: string;
    role_id: number;
    created_at: string;
}

export interface GetUserResponse extends BaseResponse, Partial<User> {
}

export interface GetUsersResponse extends BaseResponse {
    total_count?: number;
    users?: User[];
}
