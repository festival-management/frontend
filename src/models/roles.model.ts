import BaseResponse from "./base.model";

export interface Role {
    id: number;
    name: string;
}

export interface GetRolesResponse extends BaseResponse {
    total_count?: number;
    roles?: Role[];
}
