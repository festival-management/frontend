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

// Interface for the useUsersApi hook
export interface UseUsersApiInterface {
    deleteUser(id: number): Promise<BaseResponse>;
    getUsers(page: number): Promise<GetUsersResponse>;
    getUserById(id?: number): Promise<GetUserResponse>;
    updateUserName(id: number, username: string): Promise<BaseResponse>;
    updateUserPassword(password: string, id?: number): Promise<BaseResponse>;
    updateUserRoleId(id: number, roleId: number): Promise<BaseResponse>;
}
